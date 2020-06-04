import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Mission } from '../shared/models';
import { Roles, RolePresets } from '../shared/enums';
import { MissionService, MainNavService, DataSyncService } from '../core/services';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { TopDefaultNavConfig, AppButton } from '../shared/interfaces';

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
    private dataSyncService: DataSyncService,
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

  private refresh = () => this.dataSyncService.syncAll();

  private configureMainNav(){
    let cfg = {
      title:  "Hjem",
      buttons: [{icon: "update", callback: this.refresh}] as AppButton[],
    } as TopDefaultNavConfig;
    this.mainNavService.addTopNavConfig({default: cfg});
  }
  

}
