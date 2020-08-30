import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Roles } from 'src/app/shared-app/enums';
import { User } from 'src/app/core/models';
import { AppButton } from 'src/app/shared-app/interfaces';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  Roles = Roles;
  
  @Input() user: User;
  @Input() editButton: AppButton;
  @Input() newPasswordButton: AppButton;
  
  constructor() { }

}
