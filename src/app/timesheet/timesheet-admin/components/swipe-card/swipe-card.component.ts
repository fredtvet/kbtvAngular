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

  isSwipeActionHidden: boolean = true;

  isXs$: Observable<boolean> = this.deviceInfoService.isXs$;

  constructor(private deviceInfoService: DeviceInfoService) { }

  hideSwipeAction(e: any, state: boolean): void{
    if(!this.swipeEnabled) return undefined;
    this.isSwipeActionHidden = state;
  }

  handleSwipeBtnClick = (e: any, fn: Function, parameters: any[] = []) => { 
    e.preventDefault(); 
    if(!this.swipeEnabled) return undefined;
    if(!parameters || parameters.length == 0) parameters = this.swipeButton.params;
    this.isSwipeActionHidden = true;
    this.handleFn(fn, parameters);
  };

  handleNavClick = (fn: Function, parameters: any[] = []) => {
    if(!fn) return undefined;
    if(!parameters || parameters.length == 0) parameters = this.navButton.params;
    this.handleFn(fn, parameters);
  }

  private handleFn(fn: Function, parameters: any[]){
    if(parameters) fn(...parameters);
    else fn();
  }

}
