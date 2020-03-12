import { Component, OnInit, Input } from '@angular/core';
import { Roles } from '../../enums/roles.enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {
  Roles = Roles;

  constructor() { }

  ngOnInit() {
  }

}
