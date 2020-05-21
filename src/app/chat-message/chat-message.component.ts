import { Component, OnInit ,Input} from '@angular/core';
import { Observable } from 'rxjs';
import { UsersServiceService } from 'src/services/users-service.service';
import { ThreadsService } from 'src/services/threads.service';
import { MessageService } from 'src/services/message.service';
import { Message } from 'src/models/Message';
import { Thread } from 'src/models/Thread';
import { User } from 'src/models/User';


@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
@Input() message:Message;
currentUser: User;
incoming:boolean;
  constructor(public usersService: UsersServiceService) {  }

  ngOnInit(): void {
    this.usersService.curentUser.subscribe((user:User)=>{
      this.currentUser = user;
      if(this.message.author && user)
      {
        this.incoming = this.message.author.id !==user.id;
      }
    });
  }

}
