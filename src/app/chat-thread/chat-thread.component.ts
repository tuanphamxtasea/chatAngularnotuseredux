import { Component, OnInit,Input } from '@angular/core';
import { Thread } from 'src/models/Thread';
import { ThreadsService } from 'src/services/threads.service';

@Component({
  selector: 'app-chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent implements OnInit {
@Input() thread:Thread;
selected = false;
  constructor(public threadService:ThreadsService) {


   }

  ngOnInit(): void {
    this.threadService.currentThread
    .subscribe( (currentThread: Thread) => {
      this.selected = currentThread &&
        this.thread &&
        (currentThread.id === this.thread.id);
    });
  }

  clicked(event: any): void {
    this.threadService.setCurrentThread(this.thread);
    event.preventDefault();
  }
}
