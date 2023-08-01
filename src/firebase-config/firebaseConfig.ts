import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from 'firebase/messaging'

const firebaseConfig = {
    apiKey: "AIzaSyA6AsGRzE4JwfIhXXIfY_FbKrHmeBu0Q0g",
    authDomain: "fcmmess-4c2c4.firebaseapp.com",
    projectId: "fcmmess-4c2c4",
    storageBucket: "fcmmess-4c2c4.appspot.com",
    messagingSenderId: "782297257397",
    appId: "1:782297257397:web:45614e194a3bebf172f5fc",
    measurementId: "G-0SPMY4QBMB"
};

/// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app) as any
// console.log("🚀 ~ file: firebaseConfig.ts:17 ~ messaging:", messaging)

export const getMessagingToken = async (): Promise<string> => {
    let currentToken = "";

    // if (!messaging) {
    //     throw new Error("Firebase Messaging is not available.");
    // }

    // const isSupported = await messaging.requestPermission();
    // if (!isSupported) {
    //     throw new Error("Firebase Messaging is not supported in this environment.");
    // }
    // try {
    //     currentToken = await messaging.getToken({
    //         vapidKey: "BFX1FgH1_RTwOMFSvubfxQelrKn0ymi7_0iWoBUxtpBFDgSFUuLHBE3hjd4FRL0Uq134lOcAeWUXISBBu7VAkzU",
    //     });
    //     console.log("FCM registration token", currentToken);
    // } catch (error) {
    //     console.log("An error occurred while retrieving token. ", error);
    // }
    return currentToken;
};