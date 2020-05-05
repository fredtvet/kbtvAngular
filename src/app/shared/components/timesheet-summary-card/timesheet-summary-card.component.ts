import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TimesheetSummary, AppButton } from 'src/app/shared/interfaces';
import { User } from 'src/app/shared/models';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-timesheet-summary-card',
  animations: [
    trigger('showHideConfirm', [
      state('show', style({
        right:'0px'
      })),
      state('hide', style({
        right:'-86px'
      })),
      transition('show => hide', [
        animate('.1s ease-out')
      ]),
      transition('hide => show', [
        animate('.1s ease-in',)
      ]),
    ])
  ],
  templateUrl: './timesheet-summary-card.component.html'
})
export class TimesheetSummaryCardComponent {

  @Input() summary: TimesheetSummary;
  @Input() navButton: AppButton;
  @Input() confirmEnabled: boolean;

  @Output() timesheetsConfirmed = new EventEmitter();

  confirmHidden: boolean = true;

  constructor() { }

  toggleConfirm(e: any): void{
    if(!this.confirmEnabled || this.summary.openHours <= 0) return undefined;
    e.preventDefault();
    this.confirmHidden = !this.confirmHidden;
  }

  confirmSummary(): void{
    event.preventDefault();
    event.stopPropagation();
    if(this.summary.openHours <= 0) return undefined;
    this.timesheetsConfirmed.emit(this.summary.timesheets);
    this.confirmHidden = true;
  }

}
