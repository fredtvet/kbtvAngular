import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppButton } from 'src/app/shared-app/interfaces';

@Component({
  selector: 'app-swipe-card',
  animations: [
    trigger('openCloseConfirm', [
      state('open', style({
        marginLeft:'0px'
      })),
      state('close', style({
        marginLeft:'-81px'
      })),
      transition('open => close', [
        animate('.1s ease-out')
      ]),
      transition('close => open', [
        animate('.1s ease-in',)
      ]),
      transition('void => *', animate(0)),
    ])
  ],
  templateUrl: './swipe-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SwipeCardComponent {

  @Input() swipeButton: AppButton;
  @Input() navButton: AppButton;
  @Input() lockPosition: "open" | "close" | false | null;

  isClosed: boolean = true;

  private navDisabled: boolean = false;

  constructor() { }

  hideSwipeAction(e: any, state: boolean): void{
    if(this.lockPosition) return;
    this.isClosed = state;
  }

  handleSwipeBtnClick = (e: any): void => { 
    e.preventDefault(); 
    if(this.lockPosition === "close") return;
    this.navDisabled = true;
    setTimeout(() => this.navDisabled = false, 200); //Prevent click event from nav button to fire accidentally. 
    this.isClosed = true;
    this.handleFn(this.swipeButton.callback, this.swipeButton.params);
  };

  handleNavClick = (e: any): void => {
    if(!this.navButton?.callback || this.navDisabled) return;
    this.handleFn(this.navButton.callback, this.navButton.params);
  }

  private handleFn(fn: Function, parameters: any[]){
    if(parameters) fn(...parameters);
    else fn();
  }

}
