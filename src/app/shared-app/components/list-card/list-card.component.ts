import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCardComponent implements OnInit {

  @Input() startIcon: string;
  @Input() endIcon: string = "chevron_right";
  @Input() panelClass: string;
  
  constructor() { }

  ngOnInit() {
  }

}
