import { Component, OnInit } from '@angular/core';
import { ROLES, Mission } from '../shared';
import { MissionService } from '../core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public ROLES = ROLES;
  constructor(private missionService: MissionService) { }

  newestMissions: Mission[] = []

  ngOnInit() {
    this.missionService
      .getFiltered$()
      .subscribe(result => {
        if(result){this.newestMissions = result.slice(0, 4)}
      });
  }

}
