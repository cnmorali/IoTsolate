import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
        apiKey: "AIzaSyA3_QzXD54QJ1Ccw_yQ2E_CO4UQLVZqKRs",
        authDomain: "awesomeproject-b6447.firebaseapp.com",
        projectId: "awesomeproject-b6447",
        storageBucket: "awesomeproject-b6447.appspot.com",
        messagingSenderId: "15717319812",
        appId: "1:15717319812:web:b0d4b0f1b0e852fc8daed1",
        measurementId: "G-680D40TXYX"
};

// Initialize Firebase
// if(!firebase.apps.length) {
    // firebase.initializeApp(firebaseConfig);
// }
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth };

