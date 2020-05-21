import { Injectable } from '@angular/core';
import { Observable,Subject,BehaviorSubject } from 'rxjs';
import { Thread } from 'src/models/Thread';
import { MessageService } from './message.service';
import { Message } from 'src/models/Message';
import {map,combineLatest} from 'rxjs/operators';
import * as _ from 'lodash';
import { __values } from 'tslib';
@Injectable({
  providedIn: 'root'
})
export class ThreadsService {
threads:Observable<{[id:string]:Thread}>;
orderedThreads:Observable<Thread[]>;
currentThread: Subject<Thread> =  new BehaviorSubject<Thread>(new Thread());
 // `currentThreadMessages` contains the set of messages for the currently
  // selected thread
  currentThreadMessages: Observable<Message[]>;
setCurrentThread(newThread: Thread): void {  this.currentThread.next(newThread); }

  constructor(public messageServices:MessageService) {
    this.threads = messageServices.messages.
    pipe(map( (messages: Message[]) => {
      const threads: {[key: string]: Thread} = {};
      // Store the message's thread in our accumulator `threads`
      messages.map((message: Message) => {
        threads[message.thread.id] = threads[message.thread.id] ||
          message.thread;

        // Cache the most recent message for each thread
        const messagesThread: Thread = threads[message.thread.id];
        if (!messagesThread.lastMessage ||
            messagesThread.lastMessage.sentAt < message.sentAt) {
          messagesThread.lastMessage = message;
        }
      });
      return threads;
    }));


  this.orderedThreads = this.threads.
      pipe(map((threadGroups: { [key: string]: Thread }) => {
        const threads: Thread[] = _.values(threadGroups);
        return _.sortBy(threads, (t: Thread) => t.lastMessage.sentAt).reverse();
      }));

      this.currentThread.subscribe(this.messageServices.markThreadAsRead);

      this.currentThreadMessages = this.currentThread.pipe(
      combineLatest(messageServices.messages,
                     (currentThread: Thread, messages: Message[]) => {
        if (currentThread && messages.length > 0) {
          return _.chain(messages)
            .filter((message: Message) =>
                    (message.thread.id === currentThread.id))
            .map((message: Message) => {
              message.isRead = true;
              return message; })
            .value();
        } else {
          return [];
        }
      }));
}

}
