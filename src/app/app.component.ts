import { Component } from '@angular/core';
import { MessageService } from 'src/services/message.service';
import { ThreadsService } from 'src/services/threads.service';
import { UsersServiceService } from 'src/services/users-service.service';
import { ChatExampleData } from 'src/data/chat-example-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat-rxjs-angular';
  constructor(public messsageServices:MessageService,public threadServices:ThreadsService,public userServices:UsersServiceService)
  {
      ChatExampleData.init(messsageServices,threadServices,userServices);
  }
}
