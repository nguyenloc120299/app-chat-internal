/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service Worker installed.');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker activated.');
});

// Xử lý sự kiện nhận thông báo đẩy
self.addEventListener('push', (event) => {
    const payload = JSON.parse(event.data.text());
    console.log('Received a push notification:', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = { body: payload.notification.body, icon: payload.notification.image };
    const options = {
        body: payload,
        icon: 'path/to/your/icon.png', // Thay bằng đường dẫn đến biểu tượng thông báo của bạn
    };

    event.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));
});
