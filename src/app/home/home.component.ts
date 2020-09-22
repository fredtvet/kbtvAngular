import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Mission } from 'src/app/core/models';
import { SorterService } from 'src/app/core/services';
import { RolePresets, Roles } from 'src/app/shared-app/enums';
import { AppButton } from 'src/app/shared-app/interfaces';
import { SyncStore } from 'src/app/core/services/sync';
import { MainNavService, TopDefaultNavConfig } from 'src/app/layout';

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
        console.log('emit')
        this.sorterService.sortByDate(x, "lastVisited", "desc");
        return x.slice(0,4);
    }))
  }

  private refresh = () => this.syncStore.syncAll();

  private configureMainNav(){
    let cfg = {
      title:  "Hjem",
      buttons: [{icon: "update", callback: this.refresh}] as AppButton[],
    } as TopDefaultNavConfig;
    this.mainNavService.addConfig({default: cfg});
  }
  

}
