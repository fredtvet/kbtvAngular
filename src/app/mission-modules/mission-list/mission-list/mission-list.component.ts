import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { FilterSheetService } from 'src/app/core/services/filter';
import { MainNavService, TopDefaultNavConfig } from 'src/app/layout';
import { Roles } from 'src/app/shared-app/enums';
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
    tap(x => this.updateSearchBarValue(x.criteria?.searchString))
  );

  constructor(
    private mainNavService: MainNavService,
    private filterSheetService: FilterSheetService,   
    private store: MissionListStore,
    private router: Router,
    private route: ActivatedRoute,) { 
      this.configureMainNav();
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

  private configureMainNav(){
    let cfg = {title:  "Oppdrag"} as TopDefaultNavConfig;
 
    cfg.buttons = [{icon: 'filter_list', colorClass: 'color-accent', callback: this.openMissionFilter}];

    cfg.searchBar = {
      callback: this.searchMissions, 
      initialValue: this.store.criteria?.searchString,
      placeholder: "Søk med adresse eller id"
    }

    let fabs = [
      {icon: "add", aria: 'Legg til', colorClass: 'bg-accent', callback: this.openMissionForm, allowedRoles: [Roles.Leder, Roles.Mellomleder]}
    ]

    this.mainNavService.addConfig({default: cfg}, fabs);
  }

  private updateSearchBarValue(value: string){ 
    const config = this.mainNavService.topDefaultNavConfig;
    config.searchBar = {...config.searchBar, initialValue: value};
    this.mainNavService.updateConfig({default: config});
  }

}
