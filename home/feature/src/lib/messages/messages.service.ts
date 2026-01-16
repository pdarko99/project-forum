import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { io, Socket } from 'socket.io-client'; 

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // private socket = io('http://localhost:3000');
  private socket!: Socket;
  forumId!: string;

  constructor(private route: ActivatedRoute) {
    console.log('firing anaaaaa');
    this.route.params.subscribe(params => {
      console.log(params,'fromparams')
      console.log(this.route.params)
      this.forumId = params['forum']; 
      console.log(this.forumId, 'from rof');
      this.socket = io('http://localhost:3000', {
      query: {
        forumId: this.forumId
      }
      });
      this.socket.io.on('error', (error) => {
        console.log(error, 'from error');
      }); // Replace with your server URL
    });
    

  

    this.listenForMessages();
  }
  listenForMessages() {
    this.socket.on('allUsers', (data: string) => {
      console.log('allUsers:', data);
      
    });
  }

  sendMessage(message: string) {
    this.socket.emit('message', message);
  }
}
