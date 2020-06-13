import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { Roles, RolePresets, Icons } from 'src/app/shared-app/enums';
import { DataSyncService, MainNavService, MissionService } from 'src/app/core/services';
import { Mission } from 'src/app/core/models';
import { TopDefaultNavConfig, AppButton } from 'src/app/shared-app/interfaces';

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
      buttons: [{svgIcon: Icons.Sync, iconSizeClass: 'scale-75', callback: this.refresh}] as AppButton[],
    } as TopDefaultNavConfig;
    this.mainNavService.addTopNavConfig({default: cfg});
  }
  

}
