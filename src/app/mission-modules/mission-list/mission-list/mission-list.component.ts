import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { MainNavService } from 'src/app/core/services';
import { Roles } from 'src/app/shared-app/enums';
import { TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { MissionListStore } from '../mission-list.store';
import { MissionFilterCriteria } from '../interfaces/mission-filter-criteria.interface';
import { MissionFilterSheetWrapperComponent } from '../mission-filter/mission-filter-sheet-wrapper.component';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionListComponent{
  Roles = Roles;

  filteredAndSortedMissions$ = this.store.filteredAndSortedMissions$

  constructor(
    private mainNavService: MainNavService,
    private bottomSheet: MatBottomSheet,    
    private store: MissionListStore,
    private router: Router,
    private route: ActivatedRoute,) { 
      this.configureMainNav(); 
    }

  searchMissions = (searchString: string, currFilter: MissionFilterCriteria) => {
    currFilter.searchString = searchString;
    this.store.addCriteria(currFilter)
  }

  private toggleHistoricOrder = () => {
    let sortByDate = this.store.getProperty<"lastVisited" | "updatedAt">("missionSortByDate");
    sortByDate = (sortByDate === "lastVisited") ? "updatedAt" : "lastVisited";
    this.store.addSortByDate(sortByDate);

    let color = "color-background";
    if(sortByDate === "lastVisited") color = "color-accent";
    let cfg = this.mainNavService.topDefaultNavConfig;
    cfg.buttons = [...cfg.buttons];
    cfg.buttons[0].colorClass = color;
    this.mainNavService.addConfig({default: cfg})
  }

  private openMissionForm = () => 
    this.router.navigate(['ny'], {relativeTo: this.route});

  private openMissionFilter = () => 
    this.bottomSheet.open(MissionFilterSheetWrapperComponent)
  
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
