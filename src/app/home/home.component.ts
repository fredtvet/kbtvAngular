import { Component, OnInit } from '@angular/core';
import { ROLES, Mission } from '../shared';
import { MissionListService } from '../core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public ROLES = ROLES;
  constructor(private missionListService: MissionListService) { }

  newestMissions: Mission[] = []

  ngOnInit() {
    this.missionListService
      .getMissionsPaginated()
      .subscribe(result => {if(result.missions){this.newestMissions = result.missions.slice(0, 4)}});
  }

}
