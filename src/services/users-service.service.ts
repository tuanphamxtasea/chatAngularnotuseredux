import { Injectable } from '@angular/core';
import { BehaviorSubject ,Subject} from 'rxjs';
import { User} from '../models/User'

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
   curentUser :Subject<User> = new BehaviorSubject<User>(null);
   public setCurrentUser( newuser:User):void
   {
      this.curentUser.next(newuser);
   }


}


