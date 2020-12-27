import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListCardComponent {

  @Input() ellipsisDisabled: boolean;
  @Input() rippleDisabled: boolean;
  
  constructor() { }

}