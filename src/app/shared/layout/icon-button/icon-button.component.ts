import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppButton } from '../../interfaces/app-button.interface';
import { Roles } from '../../enums/roles.enum';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html'
})
export class IconButtonComponent {
  Roles = Roles;
  @Input() config: AppButton;

  @Output() fnHandled = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.config) 
  }

  handleFn = (fn: Function, parameters: any[] = []) => {
    if(parameters == undefined || parameters.length == 0) parameters = this.config.params;
    
    if(parameters) this.fnHandled.emit(fn(...parameters));
    else this.fnHandled.emit(fn());
  };

}
