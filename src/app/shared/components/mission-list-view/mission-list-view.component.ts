import { Component, OnInit, Input } from '@angular/core';
import { Mission } from 'src/app/shared/models';

@Component({
  selector: 'app-mission-list-view',
  templateUrl: './mission-list-view.component.html'
})
export class MissionListViewComponent implements OnInit {

  @Input() missions: Mission[] = [];
  @Input() title: string = "Oppdrag";
  constructor() { }

  ngOnInit() { }

}
