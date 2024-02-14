import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // private socket = io('http://localhost:3000');
  private socket: Socket;

  constructor() {
    // Connect to your Socket.IO server
    console.log('firing anaaaaa');
    this.socket = io('http://localhost:3000', {
    //   transports: ['websocket'],
    });

    this.socket.io.on('error', (error) => {
      console.log(error, 'from error');
      // ...
    }); // Replace with your server URL
  }

  // Example method to listen for 'message' event
  listenForMessages() {
    this.socket.on('message', (data: string) => {
      console.log('Received message:', data);
    });
  }

  // Example method to emit a message to the server
  sendMessage(message: string) {
    this.socket.emit('message', message);
  }
}
