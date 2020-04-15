import { Component, OnInit } from '@angular/core';
import { Mission } from '../shared/models';
import { Roles } from '../shared/enums';
import { MissionService, MainNavService } from '../core/services';
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

  constructor(
    private mainNavService: MainNavService,
    private missionService: MissionService) {
    this.configureMainNav();
  }

  ngOnInit() {
    this.missionHistory$ = this.missionService.getHistory$(4);
  }
  
  private configureMainNav(){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Hjem";
    this.mainNavService.addConfig(cfg);
  }

}
