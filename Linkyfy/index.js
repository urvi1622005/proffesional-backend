import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { logger } from './utils/logger.js';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(logger);

// Routes
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Socket.IO for Real-Time Communication
io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on('send_message', (data) => {
    io.emit('receive_message', data);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('user_typing', data);
  });

  socket.on('stop_typing', () => {
    socket.broadcast.emit('user_stopped_typing');
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
