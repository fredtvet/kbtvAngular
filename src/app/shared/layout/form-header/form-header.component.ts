import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NavAction } from '../../components/nav-action.model';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit {

  @Input() title: string = null;
  @Input() icon: string = null;
  @Input() vertActions: NavAction[] = [];

  @Output() backEvent = new EventEmitter();
  @Output() vertEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
