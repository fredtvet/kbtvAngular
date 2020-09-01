import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListCardComponent {

  @Input() config: ListCardConfig;
  
  constructor() { }

}

export interface ListCardConfig{ 
  startIcon: string;
  endIcon: string;
  panelClass: string;
  ellipsisDisabled: boolean;
  loading: boolean;
} 
