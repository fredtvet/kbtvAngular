import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ion-date-picker',
  template:`
   <div (click)="dateTime.click()" class="w-100">
      <mat-form-field class="w-100" style="pointer-events:none!important" >
        <input matInput required 
          [value]="control?.value | date : datePipeFormat || ionFormat" 
          [placeholder]="placeholder" 
          [attr.aria-label]="ariaLabel">     
      </mat-form-field>
      <ion-datetime #dateTime fxHide 
        cancel-text="Avbryt" done-text="Ferdig"
        [attr.max]="max"
        [attr.min]="min"
        [attr.day-names]="dayNames"
        [attr.day-short-names]="dayShortNames"
        [attr.month-names]="monthNames"
        [attr.month-short-names]="monthShortNames"
        [attr.display-format]="ionFormat"
        [attr.minute-values]="minuteValues"
        [value]="control?.value || defaultValue"
        (ionChange)="onChange($event.detail.value);">
      </ion-datetime>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IonDatePickerComponent {

  @Input() control: FormControl;
  @Input() defaultValue: any;
  @Input() placeholder: string;
  @Input() ariaLabel: string;
  @Input() ionFormat: string;
  @Input() datePipeFormat: string;
  @Input() minuteValues?: number[];
  @Input() min: string;
  @Input() max: string;
  @Input() valueSetter: (value: any) => void;

  dayNames = ["Søndag", "Mandag", "Tirsdag", "Onsdag","Torsdag", "Fredag", "Lørdag"]
  dayShortNames = ["Søn", "Man", "Tir", "Ons","Tor", "Fre", "Lør"]
  monthNames = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"];
  monthShortNames = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"]

  onChange(val: any){
    
    if(this.valueSetter) 
      this.valueSetter(val);
    else
      this.control?.setValue(val);
    
    this.control?.markAsDirty()
  }

}
