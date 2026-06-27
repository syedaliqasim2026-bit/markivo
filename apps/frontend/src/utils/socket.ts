import io, { Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (socket) return socket;

  socket = io(SOCKET_URL, {
    transports: ['websocket', 'polling'],
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttempts: 10,
    rejectUnauthorized: false,
  });

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  return socket;
};

export const getSocket = (): Socket | null => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
