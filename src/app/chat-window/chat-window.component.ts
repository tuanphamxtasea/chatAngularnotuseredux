import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Thread } from 'src/models/Thread';
import { Message } from 'src/models/Message';
import { User } from 'src/models/User';
import { MessageService } from 'src/services/message.service';
import { ThreadsService } from 'src/services/threads.service';
import { UsersServiceService } from 'src/services/users-service.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit {
messages:Observable<Message[]>;
currentThread:Thread;
public draftMessage:Message;
currentUser:User;
  constructor(public messageService:MessageService,public threadService:ThreadsService,public userService:UsersServiceService,public el:ElementRef) {

    this.threadService.currentThread.subscribe((thread:Thread)=>{
      this.currentThread = thread;
    });

    this.userService.curentUser.subscribe((user:User)=>{
      this.currentUser =user;
    });

   /*this.messages.subscribe((messages:Array<Message>)=>{
        setTimeout(()=>{
          this.scrollToBottom();
        });
    });*/


   }

  ngOnInit(): void {
    this.messages = this.threadService.currentThreadMessages;
    this.draftMessage = new Message();
  }

  sendMessage():void{
    const m:Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead =  true;
    this.messageService.addMessage(m);
    this.draftMessage = new Message();

  }

  onEnter(event:any):void{
    this.sendMessage();
    event.preventDefault();
  }

  scrollToBottom():void{
    const scrollPane:any = this.el.nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }



}
