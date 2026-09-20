const firebaseConfig = {
  apiKey: "AIzaSyDRmnv0y4r8JrrePuSVPiLM8wvznk1MGsw",
  authDomain: "meter-manager-e9c12.firebaseapp.com",
  databaseURL: "https://meter-manager-e9c12-default-rtdb.firebaseio.com",
  projectId: "meter-manager-e9c12",
  storageBucket: "meter-manager-e9c12.firebasestorage.app",
  messagingSenderId: "1034014653431",
  appId: "1:1034014653431:web:7e4f811d9d98dd8a538cf2",
  measurementId: "G-VDD6M2L5CC"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
