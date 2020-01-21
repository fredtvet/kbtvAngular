import { Component, OnInit } from '@angular/core';
import { ROLES } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public ROLES = ROLES;
  constructor() { }

  ngOnInit() { }

}
