import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppButton } from '../../interfaces/app-button.interface';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html'
})
export class IconButtonComponent {

  @Input() config: AppButton;

  @Output() fnHandled = new EventEmitter();
  
  constructor() { }

  handleFn = (fn: Function, parameters: any[] = []) => {
    if(parameters == undefined || parameters.length == 0) parameters = this.config.params;
    this.fnHandled.emit(fn(...parameters));
  };

}
