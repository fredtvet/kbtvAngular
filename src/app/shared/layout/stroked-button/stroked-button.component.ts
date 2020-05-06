import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppButton } from '../../interfaces/app-button.interface';

@Component({
  selector: 'app-stroked-button',
  templateUrl: './stroked-button.component.html'
})

export class StrokedButtonComponent {

  @Input() config: AppButton;

  @Output() fnHandled = new EventEmitter();
  
  constructor() { }

  handleFn = (fn: Function, parameters: any[] = []) => {
    if(parameters == undefined || parameters.length == 0) parameters = this.config.params;
    
    if(parameters) this.fnHandled.emit(fn(...parameters));
    else this.fnHandled.emit(fn());
  };

}
