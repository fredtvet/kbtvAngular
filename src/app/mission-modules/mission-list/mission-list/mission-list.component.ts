import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FilterSheetService } from 'src/app/core/services/filter';
import { MainNavService } from 'src/app/layout';
import { Roles } from 'src/app/shared-app/enums';
import { AppButton } from 'src/app/shared-app/interfaces';
import { MainTopNavComponent } from 'src/app/shared/components';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav/main-top-nav-config.interface';
import { SearchBarConfig } from 'src/app/shared/interfaces';
import { MissionCriteria } from 'src/app/shared/interfaces/mission-filter-criteria.interface';
import { MissionFilter } from 'src/app/shared/mission-filter.model';
import { MissionFilterViewComponent } from '../mission-filter-view/mission-filter-view.component';
import { MissionListStore } from '../mission-list.store';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionListComponent{
  Roles = Roles;

  filteredMissions$ = this.store.filteredMissions$.pipe(
    tap(x => this.configureMainNav(x.criteria))
  );

  private fabs: AppButton[]; 

  constructor(
    private mainNavService: MainNavService,
    private filterSheetService: FilterSheetService,   
    private store: MissionListStore,
    private router: Router,
    private route: ActivatedRoute,) { 
    this.fabs = [ 
      {icon: "add", aria: 'Legg til', colorClass: 'bg-accent', callback: this.openMissionForm, allowedRoles: [Roles.Leder, Roles.Mellomleder]}
    ];
  }

  searchMissions = (searchString: string) => {
    this.store.addFilterCriteria({...this.store.criteria, searchString})
  }

  private openMissionForm = () => {
    this.router.navigate(['ny'], {relativeTo: this.route});
  }

  private openMissionFilter = () => {
    this.filterSheetService.open({formConfig:{viewComponent: MissionFilterViewComponent}});
  }

  private configureMainNav(criteria: MissionCriteria){
    const activeCount = new MissionFilter(criteria).activeCriteriaCount;

    this.mainNavService.addConfig({
      topNavComponent: MainTopNavComponent, 
      fabs: this.fabs,
      topNavConfig: {
        title:  "Oppdrag",
        buttons: [{
          icon: 'filter_list',
          callback: this.openMissionFilter, 
          colorClass: activeCount ? "color-accent" : ""
        }],
        searchBar: {
          callback: this.searchMissions, 
          initialValue: criteria.searchString, 
          placeholder: "Søk med adresse eller id"
        }
      },
    });
  }

}
