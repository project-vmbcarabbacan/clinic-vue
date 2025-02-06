/* eslint-disable */
import { io, Socket } from 'socket.io-client';

export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(`${process.env.VUE_APP_API_URL}`);

    this.socket.on('connect', () => {
      console.log('Connected to websocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from websocket server');
    });
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  off(event: string) {
    this.socket.off(event);
  }
}
