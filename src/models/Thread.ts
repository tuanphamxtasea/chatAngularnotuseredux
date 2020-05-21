import { Message } from 'src/models/Message';
import { uiid } from 'src/util/uiid';

export class Thread{
id:string;
name:string;
avatarSrc:string;
lastMessage:Message;
  constructor(id?:string,name?:string,avatarSRC?:string)

  {
      this.id =id||uiid();
      this.name = name;
      this.avatarSrc =avatarSRC;
  }
}
