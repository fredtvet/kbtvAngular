import { Component, OnInit, Input } from '@angular/core';
import { AppButton } from '../../interfaces/app-button.interface';

@Component({
  selector: 'app-inner-nav',
  templateUrl: './inner-nav.component.html'
})
export class InnerNavComponent {

  @Input() title: string;
  @Input() colorClass: string = "bg-primary";
  @Input() buttons: AppButton[] = [];

  constructor() { }
  
}
