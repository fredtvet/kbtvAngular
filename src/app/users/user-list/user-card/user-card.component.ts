import { Component, OnInit, Input } from '@angular/core';
import { AppButton } from 'src/app/shared/interfaces';
import { Roles } from 'src/app/shared/enums';
import { User } from 'src/app/shared/models';


@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html'
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
