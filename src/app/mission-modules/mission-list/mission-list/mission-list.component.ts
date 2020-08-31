import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { MainNavService, TopDefaultNavConfig } from 'src/app/layout';
import { Roles } from 'src/app/shared-app/enums';
import { MissionListStore } from '../mission-list.store';
import { MissionFilterCriteria } from '../../../shared/interfaces/mission-filter-criteria.interface';
import { MissionFilterSheetWrapperComponent } from '../mission-filter/mission-filter-sheet-wrapper.component';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionListComponent{
  Roles = Roles;

  filteredMissions$ = this.store.filteredMissions$;

  constructor(
    private mainNavService: MainNavService,
    private bottomSheet: MatBottomSheet,    
    private store: MissionListStore,
    private router: Router,
    private route: ActivatedRoute,) { 
      this.configureMainNav()
    }

  searchMissions = (searchString: string) => {
    this.store.addCriteria({...this.store.criteria, searchString})
  }

  private openMissionForm = () => 
    this.router.navigate(['ny'], {relativeTo: this.route});

  private openMissionFilter = () => 
    this.bottomSheet.open(MissionFilterSheetWrapperComponent)
  
  private configureMainNav(){
    let cfg = {title:  "Oppdrag"} as TopDefaultNavConfig;
 
    cfg.buttons = [{icon: 'filter_list', colorClass: 'color-accent', callback: this.openMissionFilter}];

    cfg.searchBar = {
      callback: this.searchMissions, 
      placeholder: "Søk med adresse eller id"
    }

    let fabs = [
      {icon: "add", aria: 'Legg til', colorClass: 'bg-accent', callback: this.openMissionForm, allowedRoles: [Roles.Leder, Roles.Mellomleder]}
    ]

    this.mainNavService.addConfig({default: cfg}, fabs);
  }

}
