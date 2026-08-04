package com.mahmuduls.metermanager;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class MainActivity extends Activity {
    private WebView webView;
    private static final String TAG = "MeterManager";
    private static final String WEB_URL = "https://mhasanbogura.github.io/prepaid-meter-manager/";
    private static final String PANEL = "https://customer.nesco.gov.bd/pre/panel";
    private static final String SUBMIT_HISTORY = "\u09B0\u09BF\u099A\u09BE\u09B0\u09CD\u099C \u09B9\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09BF";
    private final Handler mainHandler = new Handler(Looper.getMainLooper());

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().setDecorFitsSystemWindows(true);

        webView = new WebView(this);
        setContentView(webView);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);

        webView.addJavascriptInterface(new NescoBridge(), "NescoBridge");

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                injectOverrides();
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return false;
            }
        });

        webView.loadUrl(WEB_URL);
    }

    private void injectOverrides() {
        String js =
            "(function(){" +
            "  if(window.__mm_injected) return;" +
            "  window.__mm_injected=true;" +
            "  var origFetch=window.fetch;" +
            "  window.fetch=function(url,opts){" +
            "    if(typeof url==='string' && url.indexOf('/nesco')>=0){" +
            "      try{" +
            "        var u=new URL(url,location.href);" +
            "        var probe=u.searchParams.get('probe');" +
            "        var cust=u.searchParams.get('cust');" +
            "        if(probe==='1') return Promise.resolve(new Response(JSON.stringify({ok:true,probe:true}),{status:200,headers:{'Content-Type':'application/json'}}));" +
            "        if(cust){" +
            "          var result=NescoBridge.nescoLookupSync(cust);" +
            "          return Promise.resolve(new Response(result,{status:200,headers:{'Content-Type':'application/json'}}));" +
            "        }" +
            "      }catch(e){}" +
            "    }" +
            "    return origFetch.call(this,url,opts);" +
            "};" +
            "})();";
        webView.evaluateJavascript(js, null);
    }

    @Override
    public void onBackPressed() {
        webView.evaluateJavascript(
            "(function(){" +
            "  var d=document.getElementById('dlg');" +
            "  if(d && !d.hidden){" +
            "    if(typeof closeDialog==='function') closeDialog();" +
            "    return 'dialog';" +
            "  }" +
            "  if(typeof currentView!=='undefined' && currentView!=='home'){" +
            "    currentMeterId=null; showView('home');" +
            "    return 'handled';" +
            "  }" +
            "  return 'exit';" +
            "})()",
            value -> {
                String v = value != null ? value.replace("\"", "") : "exit";
                if ("exit".equals(v)) {
                    finish();
                }
            }
        );
    }

    private String nescoLookupImpl(String cust) {
        try {
            cust = cust.replaceAll("\\D", "");
            if (cust.length() > 11) cust = cust.substring(0, 11);
            if (cust.isEmpty()) return "{\"ok\":false,\"error\":\"missing customer number\"}";

            HttpsResult panelGet = httpGet(PANEL);
            if (panelGet.code != 200) return "{\"ok\":false,\"error\":\"portal HTTP " + panelGet.code + "\"}";

            String token = extractToken(panelGet.body);
            if (token == null) return "{\"ok\":false,\"error\":\"no csrf token\"}";

            String cookie = sessionCookie(panelGet.setCookie);
            if (cookie == null || cookie.isEmpty()) return "{\"ok\":false,\"error\":\"no session cookie\"}";

            String form = "_token=" + URLEncoder.encode(token, "UTF-8") +
                "&cust_no=" + URLEncoder.encode(cust, "UTF-8") +
                "&submit=" + URLEncoder.encode(SUBMIT_HISTORY, "UTF-8");

            HttpsResult postResult = httpPost(PANEL, cookie, form);
            if (postResult.code != 200) return "{\"ok\":false,\"error\":\"portal HTTP " + postResult.code + "\"}";

            return parseNescoHtml(postResult.body);

        } catch (Exception e) {
            Log.e(TAG, "nescoLookupSync error", e);
            return "{\"ok\":false,\"error\":\"" + esc(e.getMessage()) + "\"}";
        }
    }

    private String extractToken(String html) {
        Matcher m = Pattern.compile("name=\"_token\"\\s+value=\"([^\"]+)\"").matcher(html);
        if (m.find()) return m.group(1);
        m = Pattern.compile("_token\"\\s+value=\"([^\"]+)\"").matcher(html);
        if (m.find()) return m.group(1);
        return null;
    }

    private String sessionCookie(String setCookie) {
        if (setCookie == null || setCookie.isEmpty()) return null;
        StringBuilder sb = new StringBuilder();
        for (String line : setCookie.split("\n")) {
            String trimmed = line.trim();
            int semi = trimmed.indexOf(';');
            if (semi > 0) trimmed = trimmed.substring(0, semi);
            if (sb.length() > 0) sb.append("; ");
            sb.append(trimmed);
        }
        return sb.toString();
    }

    private String parseNescoHtml(String html) {
        int start = html.indexOf("id=\"con_info_div\"");
        if (start < 0) {
            int alt = html.indexOf("con_info_div");
            if (alt >= 0) start = alt;
        }
        if (start < 0) return "{\"ok\":false,\"error\":\"customer data not found\"}";

        int end = html.indexOf("consumerRechargeData", start);
        if (end < 0) end = html.indexOf("arrear_notice_div", start);
        if (end < 0) end = html.indexOf("class=\"row\"", start + 100);
        if (end < 0) end = Math.min(start + 5000, html.length());
        String seg = html.substring(start, end);

        Pattern inputPat = Pattern.compile("<input[^>]*(?:readonly|disabled)[^>]*value=\"([^\"]*)\"", Pattern.CASE_INSENSITIVE);
        Matcher inputMat = inputPat.matcher(seg);
        java.util.List<String> inputs = new java.util.ArrayList<>();
        while (inputMat.find()) {
            inputs.add(inputMat.group(1).trim());
        }

        if (inputs.isEmpty()) {
            Pattern anyInput = Pattern.compile("<input[^>]*value=\"([^\"]+)\"");
            inputMat = anyInput.matcher(seg);
            while (inputMat.find()) {
                String val = inputMat.group(1).trim();
                if (!val.isEmpty() && !val.startsWith("#")) inputs.add(val);
            }
        }

        StringBuilder info = new StringBuilder();
        info.append("{");
        info.append("\"name\":\"").append(esc(take(inputs, 0))).append("\"");
        info.append(",\"fatherOrHusband\":\"").append(esc(take(inputs, 1))).append("\"");
        info.append(",\"address\":\"").append(esc(take(inputs, 2))).append("\"");
        info.append(",\"mobile\":\"").append(esc(take(inputs, 3))).append("\"");
        info.append(",\"office\":\"").append(esc(take(inputs, 4))).append("\"");
        info.append(",\"feeder\":\"").append(esc(take(inputs, 5))).append("\"");
        info.append(",\"consumerNo\":\"").append(esc(take(inputs, 6))).append("\"");
        info.append(",\"meterNo\":\"").append(esc(take(inputs, 7))).append("\"");
        info.append(",\"sanctionedLoad\":\"").append(esc(take(inputs, 8))).append("\"");
        info.append(",\"tariff\":\"").append(esc(take(inputs, 9))).append("\"");
        info.append(",\"meterType\":\"").append(esc(take(inputs, 10))).append("\"");
        info.append(",\"meterStatus\":\"").append(esc(take(inputs, 11))).append("\"");
        info.append(",\"installDate\":\"").append(esc(take(inputs, 12))).append("\"");
        info.append(",\"minimumRecharge\":\"").append(esc(take(inputs, 13))).append("\"");
        info.append(",\"balance\":\"").append(esc(take(inputs, 14))).append("\"");
        info.append("}");

        Pattern rowPat = Pattern.compile("<[^>]*?consumerRechargeData[^>]*>");
        Matcher rowMat = rowPat.matcher(html);
        StringBuilder hist = new StringBuilder();
        hist.append("[");
        boolean first = true;
        String firstCustomerName = "";
        String firstMeterNo = "";
        String firstTariff = "";
        String firstOrg = "";
        String[] keys = {"order", "token", "seq", "rent", "demandcharge", "tax", "pfc", "subsidyamount",
            "purchaseamount", "totalamount", "purchaseenergy", "salename", "purchasedate",
            "debtamount", "paidamount", "meterno", "customerno", "customername", "tariff", "organization"};
        String[] outKeys = {"orderId", "tokenNo", "seqNo", "meterRent", "demandCharge", "vat", "pfcCharge",
            "subsidy", "electricityAmount", "rechargeAmount", "energyUnit", "method", "rechargeDate",
            "debtAmount", "paidAmount", "meterNo", "customerNo", "customerName", "tariff", "organization"};
        while (rowMat.find()) {
            String tag = rowMat.group();
            if (!first) hist.append(",");
            first = false;
            hist.append("{");
            for (int k = 0; k < keys.length; k++) {
                if (k > 0) hist.append(",");
                String val = attr(tag, "data-" + keys[k]);
                hist.append("\"").append(outKeys[k]).append("\":\"").append(esc(val)).append("\"");
            }
            hist.append("}");
            if (firstCustomerName.isEmpty()) firstCustomerName = attr(tag, "data-customername");
            if (firstMeterNo.isEmpty()) firstMeterNo = attr(tag, "data-meterno");
            if (firstTariff.isEmpty()) firstTariff = attr(tag, "data-tariff");
            if (firstOrg.isEmpty()) firstOrg = attr(tag, "data-organization");
        }
        hist.append("]");

        String infoStr = info.toString();
        String infoBalance = take(inputs, 14);

        if (infoBalance.isEmpty() || "0".equals(infoBalance)) {
            Pattern balPat = Pattern.compile("balance[\"']?\\s*[>:]+\\s*[৳Tk]*\\s*([\\d,.]+)", Pattern.CASE_INSENSITIVE);
            Matcher balMat = balPat.matcher(html);
            if (balMat.find()) infoBalance = balMat.group(1).trim();
        }
        if (infoBalance.isEmpty() || "0".equals(infoBalance)) {
            Pattern balPat2 = Pattern.compile("id=\"status_label\"[^>]*>([^<]*)", Pattern.CASE_INSENSITIVE);
            Matcher balMat2 = balPat2.matcher(html);
            if (balMat2.find()) {
                String t = balMat2.group(1).replaceAll("[^\\d.]", "").trim();
                if (!t.isEmpty()) infoBalance = t;
            }
        }

        if (!infoBalance.isEmpty()) {
            infoStr = infoStr.replaceFirst("\"balance\":\"[^\"]*\"", "\"balance\":\"" + esc(infoBalance) + "\"");
        }

        if (firstCustomerName.isEmpty() && !firstMeterNo.isEmpty()) {
            infoStr = infoStr.replaceFirst("\"name\":\"\"", "\"name\":\"" + esc(firstMeterNo) + "\"");
        }
        if (infoStr.contains("\"customerName\":\"\"") && !firstCustomerName.isEmpty()) {
            infoStr = infoStr.replaceFirst("\"name\":\"\"", "\"name\":\"" + esc(firstCustomerName) + "\"");
        }
        if (infoStr.contains("\"tariff\":\"\"") && !firstTariff.isEmpty()) {
            infoStr = infoStr.replaceFirst("\"tariff\":\"\"", "\"tariff\":\"" + esc(firstTariff) + "\"");
        }
        if (infoStr.contains("\"meterNo\":\"\"") && !firstMeterNo.isEmpty()) {
            infoStr = infoStr.replaceFirst("\"meterNo\":\"\"", "\"meterNo\":\"" + esc(firstMeterNo) + "\"");
        }

        return "{\"ok\":true,\"info\":" + infoStr + ",\"history\":" + hist.toString() + "}";
    }

    private String attr(String tag, String attrName) {
        Pattern p = Pattern.compile(attrName + "=['\"]([^'\"]*)", Pattern.CASE_INSENSITIVE);
        Matcher m = p.matcher(tag);
        return m.find() ? m.group(1).trim() : "";
    }

    private String take(java.util.List<String> list, int i) { return i < list.size() ? list.get(i) : ""; }

    private String esc(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "");
    }

    private HttpsResult httpGet(String urlStr) throws Exception {
        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setConnectTimeout(10000);
        conn.setReadTimeout(15000);
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
        conn.setRequestProperty("Accept", "*/*");
        conn.setInstanceFollowRedirects(false);

        int code = conn.getResponseCode();
        String setCookie = conn.getHeaderField("Set-Cookie");
        BufferedReader br = new BufferedReader(new InputStreamReader(
            code >= 400 ? conn.getErrorStream() : conn.getInputStream()));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) sb.append(line);
        br.close();
        conn.disconnect();

        return new HttpsResult(code, sb.toString(), setCookie);
    }

    private HttpsResult httpPost(String urlStr, String cookie, String body) throws Exception {
        URL url = new URL(urlStr);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setConnectTimeout(10000);
        conn.setReadTimeout(15000);
        conn.setDoOutput(true);
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
        conn.setRequestProperty("Accept", "*/*");
        conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        conn.setRequestProperty("Cookie", cookie);
        conn.setRequestProperty("Origin", "https://customer.nesco.gov.bd");
        conn.setRequestProperty("Referer", urlStr);
        conn.setInstanceFollowRedirects(false);

        OutputStream os = conn.getOutputStream();
        os.write(body.getBytes(StandardCharsets.UTF_8));
        os.close();

        int code = conn.getResponseCode();
        BufferedReader br = new BufferedReader(new InputStreamReader(
            code >= 400 ? conn.getErrorStream() : conn.getInputStream()));
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) sb.append(line);
        br.close();
        conn.disconnect();

        return new HttpsResult(code, sb.toString(), null);
    }

    private static class HttpsResult {
        int code;
        String body;
        String setCookie;
        HttpsResult(int code, String body, String setCookie) {
            this.code = code;
            this.body = body;
            this.setCookie = setCookie;
        }
    }

    class NescoBridge {
        @JavascriptInterface
        public String nescoLookupSync(String cust) {
            return nescoLookupImpl(cust);
        }

        @JavascriptInterface
        public String clipboardRead() {
            android.content.ClipboardManager cm = (android.content.ClipboardManager) getSystemService(CLIPBOARD_SERVICE);
            android.content.ClipData clip = cm.getPrimaryClip();
            if (clip != null && clip.getItemCount() > 0) {
                CharSequence text = clip.getItemAt(0).getText();
                return text != null ? text.toString() : "";
            }
            return "";
        }

        @JavascriptInterface
        public void clipboardWrite(String text) {
            android.content.ClipboardManager cm = (android.content.ClipboardManager) getSystemService(CLIPBOARD_SERVICE);
            android.content.ClipData clip = android.content.ClipData.newPlainText("Meter Manager", text);
            cm.setPrimaryClip(clip);
        }

        @JavascriptInterface
        public void saveFileWithPicker(String content, String defaultName) {
            mainHandler.post(() -> {
                Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
                intent.addCategory(Intent.CATEGORY_OPENABLE);
                intent.setType("text/plain");
                intent.putExtra(Intent.EXTRA_TITLE, defaultName);
                startActivityForResult(intent, 1001);
            });
        }

        @JavascriptInterface
        public String loadFileWithPicker() {
            return null;
        }

        @JavascriptInterface
        public String getBase64FromFile(String path) {
            try {
                java.io.InputStream is = getAssets().open(path);
                byte[] bytes = new byte[is.available()];
                is.read(bytes);
                is.close();
                return android.util.Base64.encodeToString(bytes, android.util.Base64.NO_WRAP);
            } catch (Exception e) {
                return "";
            }
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 1002 && resultCode == RESULT_OK && data != null) {
            Uri uri = data.getData();
            if (uri != null) {
                try {
                    BufferedReader br = new BufferedReader(new InputStreamReader(
                        getContentResolver().openInputStream(uri)));
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = br.readLine()) != null) sb.append(line);
                    br.close();
                    String content = sb.toString().replace("'", "\\'").replace("\n", "\\n");
                    webView.evaluateJavascript(
                        "(function(){if(window._onFileLoaded)window._onFileLoaded('" + content + "');})()", null);
                } catch (Exception e) {
                    Log.e(TAG, "File read error", e);
                }
            }
        }
    }
}
