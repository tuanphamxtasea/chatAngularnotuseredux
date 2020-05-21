import {Thread} from './Thread';
import {User} from './User';
import {uiid} from '../util/uiid'

export class Message{
  id:string;
  sentAt:Date;
  isRead:boolean;
  author:User;
  text:string;
  thread:Thread;

  constructor(obj?:any)
  {
      this.id =obj && obj.id || uiid();
      this.sentAt =obj && obj.sentAt || new Date();
      this.isRead =obj && obj.idRead || false;
      this.author =obj && obj.author || null;
      this.text =obj && obj.text || false;
      this.thread =obj && obj.thread || false;
  }
}
