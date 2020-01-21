import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-list-item',
  templateUrl: './nav-list-item.component.html',
  styleUrls: ['./nav-list-item.component.css']
})
export class NavListItemComponent implements OnInit {

  @Input() name: string;
  @Input() icon: string;
  @Input() href: string = 'javascript:void(0)'; //Prevents href from working if null value

  constructor() { }

  ngOnInit() {

  }

}
