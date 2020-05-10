import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Mission } from 'src/app/shared/models';
import { Roles } from 'src/app/shared/enums';

@Component({
  selector: 'app-mission-list-view',
  templateUrl: './mission-list-view.component.html'
})
export class MissionListViewComponent implements OnInit {
  Roles = Roles;
  
  @Input() missions: Mission[] = [];
  @Input() title: string = "Oppdrag";
  @Output() search = new EventEmitter();
  @Output() createMission = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onSearch = (val: string) => this.search.emit(val);

  onCreate = () => this.createMission.emit();

}
