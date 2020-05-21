import { TestBed } from '@angular/core/testing';

import { MessageService } from './message.service';
import { User } from 'src/models/User';
import { Thread } from 'src/models/Thread';
import { Message } from 'src/models/Message';

describe('MessageService', () => {
  const messagesService: MessageService = new MessageService();
  it('should test', () => {

    const user: User = new User('Nate', '');
    const thread: Thread = new Thread('t1', 'Nate', '');
    const m1: Message = new Message({
      author: user,
      text: 'Hi!',
      thread: thread
    });

    const m2: Message = new Message({
      author: user,
      text: 'Bye!',
      thread: thread
    });

    const m3: Message = new Message({
      author: user,
      text: 'Bye one!',
      thread: thread
    });



    // listen to each message indivdually as it comes in
    messagesService.newMessages
      .subscribe( (message: Message) => {
        console.log('=> newMessages: ' + message.text);
      });

    // listen to the stream of most current messages
    messagesService.messages
      .subscribe( (messages: Message[]) => {
        console.log('=> messages: ' + messages.length);
      });

    messagesService.addMessage(m1);
    messagesService.addMessage(m2);
    messagesService.addMessage(m3);

    // => messages: 1
    // => newMessages: Hi!
    // => messages: 2
    // => newMessages: Bye!
  });
  it('should be created', () => {
    expect(messagesService).toBeTruthy();
  });
});
