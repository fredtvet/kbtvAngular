import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListItemComponent {

  @Input() startIcon: string;
  @Input() endIcon: string;
  @Input() rippleDisabled: boolean;
  
  constructor() { }

}