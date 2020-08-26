import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Mission } from 'src/app/core/models';
import { MainNavService, SorterService } from 'src/app/core/services';
import { Icons, RolePresets, Roles } from 'src/app/shared-app/enums';
import { AppButton, TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { SyncStore } from '../core/services/sync';

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
    private syncStore: SyncStore,
    private mainNavService: MainNavService,
    private sorterService: SorterService) {
    this.configureMainNav();
  }

  ngOnInit() {
    this.missionHistory$ = this.syncStore.property$<Mission[]>("missions").pipe(
      filter(x => x != null),
      map(x => {
        this.sorterService.sortByDate(x, "lastVisited", "asc");
        return x.slice(0,4);
    }))
  }

  private refresh = () => this.syncStore.syncAll();

  private configureMainNav(){
    let cfg = {
      title:  "Hjem",
      buttons: [{svgIcon: Icons.Sync, iconSizeClass: 'scale-75', callback: this.refresh}] as AppButton[],
    } as TopDefaultNavConfig;
    this.mainNavService.addConfig({default: cfg});
  }
  

}
