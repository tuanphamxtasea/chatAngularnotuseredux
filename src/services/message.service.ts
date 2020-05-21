import { Injectable } from '@angular/core';
import { Message } from '../models/Message';
import {Subject, Observable, from} from 'rxjs';
import { Thread } from 'src/models/Thread';
import { User } from 'src/models/User';
import {filter,scan,publishReplay,refCount,map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  //data management stream
  //stream new message
  newMessages:Subject<Message> = new Subject<Message>();
  messages: Observable<Message[]>;
  updates:Subject<any> = new Subject<any>();

  create: Subject<Message> = new Subject<Message>();
  markThreadAsRead: Subject<any> = new Subject<any>();
  //stream array of the current messages
  addMessage(newMes:Message):void{
    this.newMessages.next(newMes);
  }
  mesasgeForThreadUser(thread:Thread,user:User):Observable<Message>{

      return this.newMessages.pipe(filter((message:Message)=>{
        return (message.thread.id===thread.id) &&(message.author.id!==user.id);
      }));
  }

  constructor()
  {
    this.messages = this.updates.pipe(scan((messages: Message[],
      operation: IMessagesOperation) => {
        return operation(messages);
      },
     initialMessages),publishReplay(1),refCount());

     this.create.pipe(
     map( function(message: Message): IMessagesOperation {
       return (messages: Message[]) => {
         return messages.concat(message);
       };
     })).subscribe(this.updates);

     this.newMessages.subscribe(this.create);


     // similarly, `markThreadAsRead` takes a Thread and then puts an operation
    // on the `updates` stream to mark the Messages as read
    this.markThreadAsRead.
    pipe(map( (thread: Thread) => {
      return (messages: Message[]) => {
        return messages.map( (message: Message) => {
          // note that we're manipulating `message` directly here. Mutability
          // can be confusing and there are lots of reasons why you might want
          // to, say, copy the Message object or some other 'immutable' here
          if (message.thread.id === thread.id) {
            message.isRead = true;
          }
          return message;
        });
      };
    }))
    .subscribe(this.updates);



  }


}
const initialMessages: Message[] = [];
interface IMessagesOperation extends Function {
  (messages:Message[]):Message[]
}
