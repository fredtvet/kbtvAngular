import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AppButton } from 'src/app/shared-app/interfaces';
import { Roles } from 'src/app/shared-app/enums';
import { User } from 'src/app/core/models';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent implements OnInit {
  Roles = Roles;
  
  @Input() user: User;
  @Input() editButton: AppButton;

  callButton: AppButton;
  
  constructor() { }

  ngOnInit() {
  }

}
