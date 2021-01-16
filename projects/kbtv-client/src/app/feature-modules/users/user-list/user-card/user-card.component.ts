import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { User } from '@core/models';
import { Roles } from '@core/roles.enum';
import { AppButton } from '@shared-app/interfaces/app-button.interface';

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
