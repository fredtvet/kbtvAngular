import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'usernameToFullname'
})
export class UsernameToFullnamePipe implements PipeTransform {

  transform(value: string, users: User[]): string {
    const user = users.find(x => x.userName === value);
    if(user)
      return user.firstName + ' ' + user.lastName;
    else return 'Ingen';
  }

}
