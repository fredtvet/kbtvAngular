import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-ion-date-picker',
  template:`
   <span (click)="dateTime.click()">
      <mat-form-field class="w-100" style="pointer-events:none!important" >
        <input matInput [value]="value | date : displayFormat || ionFormat"  required [placeholder]="placeholder" aria-label="Velg sluttidspunkt">
      </mat-form-field>
      <ion-datetime #dateTime fxHide 
        cancel-text="Avbryt" done-text="Ferdig"
        [attr.day-names]="dayNames"
        [attr.day-short-names]="dayShortNames"
        [attr.month-names]="monthNames"
        [attr.month-short-names]="monthShortNames"
        [attr.display-format]="ionFormat"
        [attr.minute-values]="minuteValues"
        [value]="value"
        (ionChange)="valueChanged.emit($event.detail.value)">
      </ion-datetime>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IonDatePickerComponent {

  @Input() value: string;
  @Input() placeholder: string;
  @Input() ionFormat: string;
  @Input() displayFormat: string;
  @Input() minuteValues?: number[];
  @Output() valueChanged  = new EventEmitter<string>();

  dayNames = ["Søndag", "Mandag", "Tirsdag", "Onsdag","Torsdag", "Fredag", "Lørdag"]
  dayShortNames = ["Søn", "Man", "Tir", "Ons","Tor", "Fre", "Lør"]
  monthNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];
  monthShortNames = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"]

  constructor() { }

}
