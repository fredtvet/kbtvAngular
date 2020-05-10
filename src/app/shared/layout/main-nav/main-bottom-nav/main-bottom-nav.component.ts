import { Component, OnInit, Input } from '@angular/core';
import { Roles } from '../../../enums/roles.enum';

@Component({
  selector: 'app-main-bottom-nav',
  templateUrl: './main-bottom-nav.component.html'
})
export class MainBottomNavComponent implements OnInit {
  Roles = Roles;

  constructor() { }

  ngOnInit() {
  }

}
