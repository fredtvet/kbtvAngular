import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ion-date-picker',
  template:`
   <span (click)="dateTime.click()">
      <mat-form-field class="w-100" style="pointer-events:none!important" >
        <input matInput [value]="value | date : format"  required placeholder="Slutt" aria-label="Velg sluttidspunkt">
      </mat-form-field>
      <ion-datetime #dateTime [attr.display-format]="format" fxHide 
        [value]="value"
        (ionChange)="valueChanged.emit($event.detail.value)">
      </ion-datetime>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IonDatePickerComponent {

  @Input() value: string;
  @Input() format: string;
  @Output() valueChanged  = new EventEmitter<string>();
  
  constructor() { }

}
