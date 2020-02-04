import { Component, OnInit, Input } from '@angular/core';
import { ROLES } from '../../roles.enum';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.css']
})
export class BottomNavComponent implements OnInit {
  ROLES = ROLES;

  @Input() isHandset$: Observable<boolean>;

  constructor() { }

  ngOnInit() {
  }

}
