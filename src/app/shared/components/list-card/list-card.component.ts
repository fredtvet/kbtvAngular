import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListCardComponent implements OnInit {

  @Input() config: ListCardConfig;
  
  constructor() { }

  ngOnInit() {
  }

}

export interface ListCardConfig{ 
  startIcon: string;
  endIcon: string;
  panelClass: string;
  ellipsisDisabled: boolean;
} 
