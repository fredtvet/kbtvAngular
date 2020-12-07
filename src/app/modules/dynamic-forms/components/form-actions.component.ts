import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-actions',
  template:`
  <div fxLayout="row" fxLayoutAlign="end start" class="mt-3"> 
    <button mat-button *ngIf="showReset else cancelButton" [disabled]="resetDisabled" color="warn" (click)="reset.emit()">
      Nullstill
    </button>
    <ng-template #cancelButton>
      <button mat-button fxFlex=35 color="warn" 
        (click)="canceled.emit()">
        Avbryt    
      </button>   
    </ng-template>
    <button mat-raised-button fxFlex=40 color="accent" 
      [disabled]="submitDisabled"
      (click)="submitted.emit()">
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
