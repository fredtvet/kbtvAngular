import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AppButton } from '../../../shared-app/interfaces/app-button.interface';
import { ButtonTypes } from '../../../shared-app/enums/button-types.enum';

@Component({
  selector: 'app-button',
  templateUrl: './app-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppButtonComponent {
  @Input() config: AppButton;

  @Output() fnHandled = new EventEmitter();
  
  constructor() { }

  get buttonClass(): string{
    switch(this.config.type){
      case ButtonTypes.Icon: return "mat-icon-button";
      case ButtonTypes.Stroked: return "mat-stroked-button";
      case ButtonTypes.Fab: return "mat-fab";
      default: return "";
    }
  }

  handleFn = (fn: Function, parameters: unknown[] = []) => {
    if(!parameters?.length) parameters = this.config.params || [];
    
    if(parameters) this.fnHandled.emit(fn(...parameters));
    else this.fnHandled.emit(fn());
  };

}
