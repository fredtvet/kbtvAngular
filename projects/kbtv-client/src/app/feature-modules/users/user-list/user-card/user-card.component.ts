import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Roles } from '@shared-app/enums';
import { User } from '@core/models';
import { AppButton } from '@shared-app/interfaces';

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
