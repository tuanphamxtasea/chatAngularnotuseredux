import { Component, OnInit,Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ThreadsService } from 'src/services/threads.service';
import { Thread } from 'src/models/Thread';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {
public threads:Observable<any>;

  constructor(public threadService:ThreadsService) {
      this.threads = threadService.orderedThreads;

  }

  ngOnInit(): void {
  }

}
