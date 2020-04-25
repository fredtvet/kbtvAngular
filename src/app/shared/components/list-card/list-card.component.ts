import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html'
})
export class ListCardComponent implements OnInit {

  @Input() startIcon: string;
  @Input() endIcon: string = "chevron_right";
  @Input() text: string;
  
  constructor() { }

  ngOnInit() {
  }

}
