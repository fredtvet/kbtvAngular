import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Mission } from 'src/app/shared/interfaces/models';
import { Roles } from 'src/app/shared/enums';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { listAnimation } from 'src/app/shared/animations/list.animation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mission-list-view',
  templateUrl: './mission-list-view.component.html',
  animations: [listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionListViewComponent implements OnInit {
  Roles = Roles;
  
  @Input() missions: Mission[] = [];
  @Input() title: string = "Oppdrag";
  @Output() search = new EventEmitter();

  constructor(
    private _bottomSheet: MatBottomSheet,
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() { }

  onSearch = (val: string) => this.search.emit(val);

  openMissionForm = () => this.router.navigate(['ny'], {relativeTo: this.route});
  
  trackByFn = (index: number, mission: Mission) => {return mission.id};

}
