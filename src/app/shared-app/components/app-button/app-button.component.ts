import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AppButton } from '../../interfaces/app-button.interface';
import { ButtonTypes } from '../../enums/button-types.enum';

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

  handleFn = (fn: Function, parameters: any[] = []) => {
    if(parameters == undefined || parameters.length == 0) parameters = this.config.params;
    
    if(parameters) this.fnHandled.emit(fn(...parameters));
    else this.fnHandled.emit(fn());
  };

}
