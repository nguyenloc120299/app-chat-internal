importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

// Initialize Firebase in service worker
const firebaseConfig = {
    // Thêm thông tin cấu hình Firebase của bạn ở đây
};
firebase.initializeApp(firebaseConfig);

// Xử lý sự kiện push
self.addEventListener('push', (event) => {
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: data.icon,
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
});

// Tương tác với thông báo
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    // Xử lý tương tác với thông báo tại đây (ví dụ: mở một trang web khi người dùng nhấn vào thông báo)
    // event.waitUntil(self.clients.openWindow('https://example.com'));
});
