import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DeviceInfoService } from 'src/app/core/services';
import { AppButton } from 'src/app/shared-app/interfaces';

@Component({
  selector: 'app-swipe-card',
  animations: [
    trigger('showHideConfirm', [
      state('show', style({
        marginLeft:'0px'
      })),
      state('hide', style({
        marginLeft:'-81px'
      })),
      transition('show => hide', [
        animate('.1s ease-out')
      ]),
      transition('hide => show', [
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
  @Input() swipeEnabled: boolean;

  isSwipeButtonHidden: boolean = true;
  navDisabled: boolean = false;

  isXs$: Observable<boolean> = this.deviceInfoService.isXs$;

  constructor(private deviceInfoService: DeviceInfoService) { }

  hideSwipeAction(e: any, state: boolean): void{
    if(!this.swipeEnabled) return undefined;
    this.isSwipeButtonHidden = state;
  }

  handleSwipeBtnClick = (e: any): void => { 
    e.preventDefault(); 
    if(!this.swipeEnabled) return undefined;
    this.navDisabled = true;
    setTimeout(() => this.navDisabled = false, 200); //Prevent click event from nav button to fire accidentally. 
    this.isSwipeButtonHidden = true;
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
