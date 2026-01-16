import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { map, shareReplay } from 'rxjs';
// import { io } from 'socket.io-client';
import { ActivatedRoute } from '@angular/router';
import { io, Socket } from 'socket.io-client'; 


@Component({
  selector: 'project-forum-messages',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MessagesComponent implements OnInit{
  private socket!: Socket;

  private route = inject(ActivatedRoute)
  private breakpointObserver = inject(BreakpointObserver);
  // private messageService = inject(MessageService);
  // private socket = io('http://localhost:3000');

  constructor(){
    this.route.params.subscribe(params => {
      console.log(params,'fromparams')
      console.log(this.route.params)
      const forumId = params['forum']; 
      console.log(forumId, 'from rof');

  })}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const forumId = params['forum']; 
      if (forumId) {
        this.connectSocket(forumId);
      } else {
        console.error('Forum ID is undefined');
      }
    });
  }
  
  connectSocket(forumId: string): void {
    this.socket = io('http://localhost:3000', {
      query: {
        forumId: forumId
      }
    });
  
    this.socket.on('connect', () => {
      console.log('Socket connected');
    });
  
    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    this.listenForMessages()

    
  }

  listenForMessages() {
    this.socket.on('allUsers', (data: string) => {
      console.log('allUsers:', data);
      
    });
  }

  showFiller = false;

  isHandset = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      shareReplay()
    )
  );
}
