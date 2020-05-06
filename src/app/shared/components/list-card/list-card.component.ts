import { Component, OnInit, Input } from '@angular/core';
import { AppButton } from '../../interfaces/app-button.interface';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html'
})
export class ListCardComponent implements OnInit {

  @Input() startIcon: string;
  @Input() endIcon: string = "chevron_right";
  @Input() navButton: AppButton;
  @Input() text: string;
  
  constructor() { }

  ngOnInit() {
  }

}
