import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-list-item',
  templateUrl: './nav-list-item.component.html'
})

export class NavListItemComponent implements OnInit {

  @Input() config: {
    mainLine: string,
    subLines: {name: string, icon: string}[],
    startIcon: string,
    endIcon: string,
  };

  @Input() last: boolean;

  constructor() { }

  ngOnInit() {

  }

}
