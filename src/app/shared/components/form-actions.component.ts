import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-actions',
  template:`
  <div fxLayout="row" fxLayoutAlign="start start" class="mt-2">  
    <button mat-raised-button fxFlex=40 color="accent" 
    [disabled]="submitDisabled"
    (click)="submitted.emit()">
    {{ submitText }}    
    </button>
    <button mat-button fxFlex=35 color="warn" 
      (click)="canceled.emit()">
      Avbryt    
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
