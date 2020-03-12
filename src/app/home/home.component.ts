import { Component, OnInit } from '@angular/core';
import { Mission } from '../shared/models';
import { Roles } from '../shared/enums';
import { MissionService } from '../core/services';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public Roles = Roles;

  newestMissions: Mission[] = []

  missionHistory$: Observable<Mission[]>;

  constructor(private missionService: MissionService) {
    this.missionHistory$ = this.missionService.getHistory$(4);
  }

  ngOnInit() {}

}
