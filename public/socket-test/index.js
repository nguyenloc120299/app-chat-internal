// Import thư viện
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Khởi tạo ứng dụng Express
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Danh sách phòng và người dùng
const rooms = {};

// Đường dẫn giao diện người dùng
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Xử lý kết nối từ người dùng
io.on('connection', (socket) => {
    console.log('Người dùng mới đã kết nối.');

    // Xử lý khi người dùng tham gia một phòng
    socket.on('joinRoom', (roomName, username) => {
        socket.join(roomName);

        // Lưu thông tin người dùng vào phòng
        if (!rooms[roomName]) {
            rooms[roomName] = [];
        }
        rooms[roomName].push(username);

        // Gửi thông báo cho tất cả thành viên trong phòng về người dùng mới
        socket.to(roomName).emit('userJoined', username);

        // Gửi danh sách thành viên trong phòng về cho người dùng mới
        io.to(socket.id).emit('roomUsers', rooms[roomName]);
    });

    // Xử lý khi người dùng gửi tin nhắn
    socket.on('sendMessage', (roomName, username, message) => {
        // Gửi tin nhắn đến tất cả thành viên trong phòng
        io.to(roomName).emit('message', { username, message });
    });

    // Xử lý khi người dùng ngắt kết nối
    socket.on('disconnect', () => {
        console.log('Người dùng đã ngắt kết nối.');
        // TODO: Xóa người dùng khỏi danh sách phòng nếu cần thiết.
    });
});

// Khởi chạy server
const port = 10000;
server.listen(port, () => {
    console.log(`Server đang lắng nghe trên cổng ${port}`);
});
