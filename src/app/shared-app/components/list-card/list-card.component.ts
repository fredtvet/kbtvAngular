import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ListCardComponent {

  @Input() startIcon: string;
  @Input() endIcon: string;
  @Input() ellipsisDisabled: boolean;

  constructor() { }

}