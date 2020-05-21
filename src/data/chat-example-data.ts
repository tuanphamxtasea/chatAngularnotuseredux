import { User } from "src/models/User";
import { Thread } from 'src/models/Thread';
import { Message } from 'src/models/Message';
import * as moment from 'moment';
import { MessageService } from 'src/services/message.service';
import { ThreadsService } from 'src/services/threads.service';
import { UsersServiceService } from 'src/services/users-service.service';
// the person using the app us Juliet
const me: User      = new User('Juliet', 'assets/images/avatars/female-avatar-1.png');
const ladycap: User = new User('Lady Capulet', 'assets/images/avatars/female-avatar-2.png');
const echo: User    = new User('Echo Bot', 'assets/images/avatars/male-avatar-1.png');
const rev: User     = new User('Reverse Bot', 'assets/images/avatars/female-avatar-4.png');
const wait: User    = new User('Waiting Bot', 'assets/images/avatars/male-avatar-2.png');

const tLadycap: Thread = new Thread('tLadycap', ladycap.name, ladycap.avartaSrc);
const tEcho: Thread    = new Thread('tEcho', echo.name, echo.avartaSrc);
const tRev: Thread     = new Thread('tRev', rev.name, rev.avartaSrc);
const tWait: Thread    = new Thread('tWait', wait.name, wait.avartaSrc);

const initialMessages: Array<Message> = [
  new Message({
    author: me,
    sentAt: moment().subtract(45, 'minutes').toDate(),
    text: 'Yet let me weep for such a feeling loss.',
    thread: tLadycap
  }),
  new Message({
    author: ladycap,
    sentAt: moment().subtract(20, 'minutes').toDate(),
    text: 'So shall you feel the loss, but not the friend which you weep for.',
    thread: tLadycap
  }),
  new Message({
    author: echo,
    sentAt: moment().subtract(1, 'minutes').toDate(),
    text: `I\'ll echo whatever you send me`,
    thread: tEcho
  }),
  new Message({
    author: rev,
    sentAt: moment().subtract(3, 'minutes').toDate(),
    text: `I ll reverrse whatdever you send me`,
    thread: tRev
  }),
  new Message({
    author: wait,
    sentAt: moment().subtract(4, 'minutes').toDate(),
    text: `I\'ll wait however many seconds you send to me before responding. Try sending '3'`,
    thread: tWait
  }),
];

export class ChatExampleData{
  static init(messageServices:MessageService,threadServices:ThreadsService,userServices:UsersServiceService):void{
     messageServices.messages.subscribe(()=>({}));
     userServices.setCurrentUser(me);
      //  create the initial messages
     initialMessages.map( (message: Message) => messageServices.addMessage(message) );
     threadServices.setCurrentThread(tEcho);
     ChatExampleData.setupBots(messageServices);
  }

  static setupBots(messagesService: MessageService): void {
    console.log("resever bot");
    // echo bot
    messagesService.mesasgeForThreadUser(tEcho, echo)
      .forEach( (message: Message): void => {

        messagesService.addMessage(
          new Message({
            author: echo,
            text: message.text,
            thread: tEcho
          })
        );
      },
                null);

        // reverse bot
  messagesService.mesasgeForThreadUser(tRev, rev)
    .forEach( (message: Message): void => {

     messagesService.addMessage(
      new Message({
       author: rev,
       text: message.text.split("d").reverse().join(),
       thread: tRev
      })
     );
    },
          null);


  // waiting bot
  messagesService.mesasgeForThreadUser(tWait, wait)
  .forEach( (message: Message): void => {

    let waitTime: number = parseInt(message.text, 10);
    let reply: string;

    if (isNaN(waitTime)) {
      waitTime = 0;
      reply = `I didn\'t understand ${message.text}. Try sending me a number`;
    } else {
      reply = `I waited ${waitTime} seconds to send you this.`;
    }

    setTimeout(
      () => {
        messagesService.addMessage(
          new Message({
            author: wait,
            text: reply,
            thread: tWait
          })
        );
      },
      waitTime * 1000);
  },
            null);

  }
}

