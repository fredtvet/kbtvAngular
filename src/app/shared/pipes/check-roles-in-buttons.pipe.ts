import { Pipe, PipeTransform } from '@angular/core';
import { AppButton } from '../../shared-app/interfaces/app-button.interface';

@Pipe({
  name: 'checkRolesInButtons'
})
export class CheckRolesInButtonsPipe implements PipeTransform {

  transform(buttons: AppButton[], role: string): any {
    if(!buttons || buttons.length == 0) return false; //No buttons no roles

    let allowedRoles: string[] = [].concat
      .apply([], buttons.map(x => x.allowedRoles || [])) //Flatten all roles to one array
      .filter((value, index, self) => self.indexOf(value) === index); //Filter unique

    //Return true if no roles are given or input role find match in array
    if(!allowedRoles || allowedRoles.length == 0 || allowedRoles.includes(role)) return true; 

    return false;
  }

}
