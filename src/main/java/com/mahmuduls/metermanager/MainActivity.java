package com.mahmuduls.metermanager;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Base64;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.view.View;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MainActivity extends Activity {
    private WebView webView;
    private static final String TAG = "MeterManager";
    private static final String WEB_URL = "https://mhasanbogura.github.io/prepaid-meter-manager/";
    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private final Handler mainHandler = new Handler(Looper.getMainLooper());

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        getWindow().setStatusBarColor(0x00000000);
        getWindow().setDecorFitsSystemWindows(false);

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
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return false;
            }
        });

        webView.loadUrl(WEB_URL);
    }

    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            webView.evaluateJavascript(
                "(function() { " +
                "  if (typeof currentView !== 'undefined' && currentView !== 'home') { " +
                "    window.currentView = 'home'; window.currentMeterId = null; " +
                "    if (typeof renderHome === 'function') renderHome(); " +
                "    return 'handled'; " +
                "  } " +
                "  return 'exit'; " +
                "})()",
                value -> {
                    String v = value != null ? value.replace("\"", "") : "exit";
                    if (!"handled".equals(v)) {
                        finish();
                    }
                }
            );
        }
    }

    class NescoBridge {

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
            try {
                final Object[] result = new Object[1];
                final Object lock = new Object();

                mainHandler.post(() -> {
                    Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
                    intent.addCategory(Intent.CATEGORY_OPENABLE);
                    intent.setType("*/*");
                    try {
                        startActivityForResult(intent, 1002);
                    } catch (Exception e) {
                        Log.e(TAG, "File picker error", e);
                    }
                });

                return null;
            } catch (Exception e) {
                Log.e(TAG, "loadFileWithPicker error", e);
                return null;
            }
        }

        @JavascriptInterface
        public void nescoLookup(String custId, String callbackId) {
            executor.execute(() -> {
                try {
                    String baseUrl = probeNescoBase();
                    if (baseUrl == null) {
                        postCallback(callbackId, "error", "Cannot reach NESCO server");
                        return;
                    }

                    String urlStr = baseUrl + "/nesco?cust=" + custId;
                    Log.d(TAG, "NESCO lookup: " + urlStr);

                    URL url = new URL(urlStr);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("GET");
                    conn.setConnectTimeout(10000);
                    conn.setReadTimeout(15000);
                    conn.setRequestProperty("User-Agent", "Mozilla/5.0");

                    int code = conn.getResponseCode();
                    if (code != 200) {
                        postCallback(callbackId, "error", "HTTP " + code);
                        return;
                    }

                    BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = br.readLine()) != null) sb.append(line);
                    br.close();
                    conn.disconnect();

                    String html = sb.toString();
                    if (html.contains("Not Found") || html.length() < 50) {
                        postCallback(callbackId, "error", "Empty response");
                        return;
                    }

                    postCallback(callbackId, "ok", html);

                } catch (Exception e) {
                    Log.e(TAG, "nescoLookup error", e);
                    postCallback(callbackId, "error", e.getMessage());
                }
            });
        }

        private String probeNescoBase() {
            String[] candidates = {
                "https://prepaid.nesco.gov.bd",
                "https://nesco-prepaid.com",
                "https://www.nesco.gov.bd",
                "https://nesco.gov.bd"
            };
            for (String base : candidates) {
                try {
                    URL url = new URL(base);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("GET");
                    conn.setConnectTimeout(5000);
                    conn.setReadTimeout(5000);
                    conn.setInstanceFollowRedirects(true);
                    int code = conn.getResponseCode();
                    conn.disconnect();
                    if (code > 0 && code < 500) return base;
                } catch (Exception ignored) {}
            }
            return null;
        }

        private void postCallback(String callbackId, String status, String data) {
            String escaped = data.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n").replace("\r", "");
            String js = "javascript:window._nescoCallback('" + callbackId + "','" + status + "','" + escaped + "')";
            mainHandler.post(() -> webView.evaluateJavascript(
                "(function(){if(window._nescoCallback)window._nescoCallback('" + callbackId + "','" + status + "','" + escaped + "');})()",
                null
            ));
        }

        @JavascriptInterface
        public String getBase64FromFile(String path) {
            try {
                java.io.InputStream is = getAssets().open(path);
                byte[] bytes = new byte[is.available()];
                is.read(bytes);
                is.close();
                return Base64.encodeToString(bytes, Base64.NO_WRAP);
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
