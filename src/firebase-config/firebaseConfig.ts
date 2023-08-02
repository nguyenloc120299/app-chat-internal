import { notification } from "antd";
import { ArgsProps, NotificationPlacement } from "antd/es/notification/interface";
import { updateUser } from "api/user";
import { initializeApp } from "firebase/app";
import { getToken, getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA6AsGRzE4JwfIhXXIfY_FbKrHmeBu0Q0g",
  authDomain: "fcmmess-4c2c4.firebaseapp.com",
  projectId: "fcmmess-4c2c4",
  storageBucket: "fcmmess-4c2c4.appspot.com",
  messagingSenderId: "782297257397",
  appId: "1:782297257397:web:45614e194a3bebf172f5fc",
  measurementId: "G-0SPMY4QBMB",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const getOrRegisterServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    return window.navigator.serviceWorker
      .getRegistration("/firebase-push-notification-scope")
      .then((serviceWorker) => {
        if (serviceWorker) return serviceWorker;
        return window.navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
          {
            scope: "/firebase-push-notification-scope",
          }
        );
      });
  }
  throw new Error("The browser doesn`t support service worker.");
};

export const getFirebaseToken = () =>
  getOrRegisterServiceWorker().then((serviceWorkerRegistration) =>
    getToken(messaging, {
      vapidKey:
        "BFX1FgH1_RTwOMFSvubfxQelrKn0ymi7_0iWoBUxtpBFDgSFUuLHBE3hjd4FRL0Uq134lOcAeWUXISBBu7VAkzU",
      serviceWorkerRegistration,
    })
  );

export const handleGetFirebaseToken = () => {
  getFirebaseToken()
    .then(async (firebaseToken) => {
      console.log("Firebase token: ", firebaseToken);
      await updateUser({
        tokenFireBase: firebaseToken,
      });
    })
    .catch((err) =>
      console.error("An error occured while retrieving firebase token. ", err)
    );
};

export const onForegroundMessage = () =>
  new Promise((resolve) => onMessage(messaging, (payload) => resolve(payload)));



