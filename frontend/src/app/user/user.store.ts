import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from './user';
import {UserService} from './user.service';

@Injectable()
export class UserStore {
  private _user: BehaviorSubject<User>;

  constructor(private userService: UserService) {
    this._user = new BehaviorSubject({
      email: '',
      name: '',
      password: '',
      id: -1
    });

    this.userService.getUser().subscribe(user => {
      if (user) {
        this.setUser(user);
      }
    });
  }

  get user(): BehaviorSubject<User> {
    return this._user;
  }

  setUser(user: User): void {
    this.user.next(user);
  }
}
