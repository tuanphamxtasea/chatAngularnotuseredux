import {uiid} from '../util/uiid';
export class User{
id:string;
  constructor(public name:string,public avartaSrc:string)
  {
    this.id =uiid();
  }
}
