import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Mission } from 'src/app/core/models';
import { Roles } from 'src/app/shared-app/enums';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mission-list-view',
  templateUrl: './mission-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionListViewComponent implements OnInit {
  Roles = Roles;
  
  @Input() missions: Mission[] = [];
  @Input() searchInput: string;
  @Input() title: string = "Oppdrag";
  @Output() search = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onSearch = (val: string) => this.search.emit(val);

  //openMissionForm = () => this.router.navigate(['ny'], {relativeTo: this.route});
  
  trackByFn = (index: number, mission: Mission) => mission.id;

}
