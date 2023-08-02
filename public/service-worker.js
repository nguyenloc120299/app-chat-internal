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
    const payload = event.data.text();
    console.log('Received a push notification:', payload);

    const options = {
        body: payload,
        icon: "" // Thay bằng đường dẫn đến biểu tượng thông báo của bạn
    };

    event.waitUntil(self.registration.showNotification('Push Notification', options));
});