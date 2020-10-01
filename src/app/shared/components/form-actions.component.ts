import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-actions',
  template:`
  <div fxLayout="row" fxLayoutAlign="end start" class="mt-3"> 
    <button mat-button fxFlex=35 color="warn" 
      (click)="canceled.emit()">
      Avbryt    
    </button> 
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
   @Output() canceled = new EventEmitter();
   @Output() submitted = new EventEmitter();

  constructor() {}

}
