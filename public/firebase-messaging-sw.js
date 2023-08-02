/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.10.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyA6AsGRzE4JwfIhXXIfY_FbKrHmeBu0Q0g",
    authDomain: "fcmmess-4c2c4.firebaseapp.com",
    projectId: "fcmmess-4c2c4",
    storageBucket: "fcmmess-4c2c4.appspot.com",
    messagingSenderId: "782297257397",
    appId: "1:782297257397:web:45614e194a3bebf172f5fc",
    measurementId: "G-0SPMY4QBMB"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message: ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = { body: payload.notification.body };

    self.registration.showNotification(notificationTitle, notificationOptions)
});