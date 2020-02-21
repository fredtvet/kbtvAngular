import { Component, OnInit } from '@angular/core';
import { ROLES, Mission } from '../shared';
import { MissionService } from '../core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public ROLES = ROLES;

  newestMissions: Mission[] = []

  missionHistory$: Observable<Mission[]>;

  constructor(private missionService: MissionService) {
    this.missionHistory$ = this.missionService.getHistory$(5);
  }

  ngOnInit() {}

}
