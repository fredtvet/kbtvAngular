import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavAction } from '../nav-action.model';


@Component({
  selector: 'app-vert-menu',
  templateUrl: './vert-menu.component.html'
})
export class VertMenuComponent implements OnInit {

  @Input() actions: NavAction[];
  @Output() event = new EventEmitter();

  public allActionRoles: string[] = [];

  constructor() { }

  ngOnInit(){
    if(this.actions)
      this.actions.map(x => this.allActionRoles = this.allActionRoles.concat(...x.roles));
  }

  handleEvent(e: string){
    this.event.emit(e);
  }

}
