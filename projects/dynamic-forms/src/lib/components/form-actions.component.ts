import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-form-actions',
  template:`
  <div fxLayout="row" fxLayoutAlign="end start" style="margin: 12px 0 16px 0"> 
    <button mat-button *ngIf="showReset else cancelButton" [disabled]="resetDisabled" color="warn" (tap)="reset.emit()">
      Nullstill
    </button>
    <ng-template #cancelButton>
      <button mat-button fxFlex=35 color="warn" 
        (tap)="canceled.emit()">
        Avbryt    
      </button>   
    </ng-template>
    <button mat-raised-button fxFlex=40 color="accent" 
      [disabled]="submitDisabled"
      (tap)="submitted.emit()">
      {{ submitText }}    
    </button>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormActionsComponent {
    
   @Input() submitDisabled: boolean;
   @Input() submitText: boolean;

   @Input() showReset?: boolean;
   @Input() resetDisabled?: boolean

   @Output() reset = new EventEmitter();
   @Output() canceled = new EventEmitter();
   @Output() submitted = new EventEmitter();

  constructor() {}

}
