import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppButton } from '@shared/components/app-button/app-button.interface';

@Component({
  selector: 'app-swipe-card',
  animations: [
    trigger('openCloseConfirm', [
      state('open', style({
        transform: 'translateX({{open_width}})'
      }), {params: {open_width: '0'}}),
      state('close', style({
        transform: 'translateX({{closed_width}})'
      }), {params: {closed_width: '0'}}),
      transition('open => close', [
        animate('.1s ease-out')
      ]),
      transition('close => open', [
        animate('.1s ease-in',)
      ]),
      transition('void => *', animate(0)),
    ])
  ],
  styleUrls: ['./swipe-card.component.scss'],
  templateUrl: './swipe-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SwipeCardComponent {

  @Input() swipeButton: AppButton;
  @Input() lockPosition: "open" | "close" | false | null;
  @Input() openWidth: number;
  @Input() closedWidth: number;

  isClosed: boolean = true;

  constructor() { }

  toggleSwipeContent(isClosed: boolean): void{
    if(this.lockPosition) return;
    this.isClosed = isClosed;
  }

}
