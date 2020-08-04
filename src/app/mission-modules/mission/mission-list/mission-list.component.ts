import { Component, ChangeDetectionStrategy  } from '@angular/core';
import { MainNavService } from 'src/app/core/services';
import { TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { Roles } from 'src/app/shared-app/enums';
import { MissionSortBy } from '../mission-sort-by.enum';
import { MissionsFacade } from '../missions.facade';
import { MissionFilter } from '../mission.filter';
import { MissionFilterWrapperComponent } from '../mission-filter/mission-filter-wrapper.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionListComponent{
  MissionSortBy = MissionSortBy;
  Roles = Roles;

  vm$ = this.missionsFacade.missionListVm$;

  constructor(
    private mainNavService: MainNavService,
    private missionsFacade: MissionsFacade,
    private bottomSheet: MatBottomSheet,    
    private router: Router,
    private route: ActivatedRoute,) { 
      this.configureMainNav();
    }

  ngOnInit(){}

  searchMissions = (searchString: string, currFilter: MissionFilter) => {
    currFilter.searchString = searchString;
    this.missionsFacade.addFilter(currFilter)
  }

  private toggleHistoricOrder = () => {
    let sortBy = this.missionsFacade.getSortBy();
    sortBy = (sortBy === MissionSortBy.Historic) ? MissionSortBy.UpdatedAt : MissionSortBy.Historic;
    this.missionsFacade.addSortBy(sortBy);

    let color = "color-background";
    if(sortBy === MissionSortBy.Historic) color = "color-accent";
    let cfg = this.mainNavService.topDefaultNavConfig;
    cfg.buttons = [...cfg.buttons];
    cfg.buttons[0].colorClass = color;
    this.mainNavService.addConfig({default: cfg})
  }

  private openMissionForm = () => 
    this.router.navigate(['ny'], {relativeTo: this.route});

  private openMissionFilter = () => 
    this.bottomSheet.open(MissionFilterWrapperComponent)
  
  private configureMainNav(){
    let cfg = {title:  "Oppdrag"} as TopDefaultNavConfig;
 
    cfg.buttons = [
      {icon: "history", colorClass: "color-background",aria: 'Historisk visning',callback: this.toggleHistoricOrder},     
      {icon: 'filter_list', colorClass: 'color-accent', callback: this.openMissionFilter}
    ];

    let fabs = [
      {icon: "add", aria: 'Legg til', colorClass: 'bg-accent', callback: this.openMissionForm, allowedRoles: [Roles.Leder, Roles.Mellomleder]}
    ]

    this.mainNavService.addConfig({default: cfg}, fabs);
  }

}
