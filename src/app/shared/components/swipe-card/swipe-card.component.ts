import { Component, OnInit, Input } from '@angular/core';
import { AppButton } from '../../interfaces/app-button.interface';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { SubscriptionComponent } from '../abstracts/subscription.component';
import { takeUntil, map, shareReplay } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  styleUrls: ['./swipe-card.component.scss']
})
export class SwipeCardComponent extends SubscriptionComponent {

  @Input() swipeButton: AppButton;
  @Input() navButton: AppButton;
  @Input() swipeEnabled: boolean;

  isSwipeActionHidden: boolean = true;

  isXs$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(
      takeUntil(this.unsubscribe),
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) { super(); }

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
