import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Mission } from '../shared/models';
import { Roles, RolePresets } from '../shared/enums';
import { MissionService, MainNavService } from '../core/services';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent {
  Roles = Roles;
  rolePresets = RolePresets;

  missionHistory$: Observable<Mission[]>;

  constructor(
    private mainNavService: MainNavService,
    private missionService: MissionService) {
    this.configureMainNav();
  }

  ngOnInit() {
    this.missionHistory$ = this.missionService.getAll$().pipe(map(x => {
      let sorted = this.missionService.sortByHistory(x);
      return sorted.slice(0,4);
    }))
  }
  
  private configureMainNav(){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Hjem";
    this.mainNavService.addConfig(cfg);
  }
  

}
