import { Component, OnInit, Input } from '@angular/core';
import { Roles } from '../../../enums/roles.enum';

@Component({
  selector: 'app-main-bottom-nav',
  templateUrl: './main-bottom-nav.component.html',
  styleUrls: ['./main-bottom-nav.component.scss']
})
export class MainBottomNavComponent implements OnInit {
  Roles = Roles;

  @Input() openTimesheetCount: number;

  constructor() { }

  ngOnInit() {
  }

}
