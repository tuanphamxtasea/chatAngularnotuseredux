import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { MessageService } from 'src/services/message.service';
import { ThreadsService } from 'src/services/threads.service';
import { combineLatest,timer, Observable } from 'rxjs';
import { Message } from 'src/models/Message';
import { Thread } from 'src/models/Thread';
@Component({
  selector: 'app-chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html',
  styleUrls: ['./chat-nav-bar.component.css']
})
export class ChatNavBarComponent implements OnInit {
unreadMessagesCount:number;

  constructor(public messagesService:MessageService,public  threadsService:ThreadsService) {
  }

  ngOnInit(): void {
    combineLatest(this.messagesService.messages,this.threadsService.currentThread,
      (messages: Message[], currentThread: Thread) => [currentThread, messages] )
      .subscribe(([currentThread, messages]: [Thread, Message[]]) => {
        this.unreadMessagesCount =
          _.reduce(
            messages,
            (sum: number, m: Message) => {
              const messageIsInCurrentThread: boolean = m.thread &&
                currentThread &&
                (currentThread.id === m.thread.id);
              // note: in a "real" app you should also exclude
              // messages that were authored by the current user b/c they've
              // already been "read"
              if (m && !m.isRead && !messageIsInCurrentThread) {
                sum = sum + 1;
              }
              return sum;
            },
            0);
          });

     }

}
