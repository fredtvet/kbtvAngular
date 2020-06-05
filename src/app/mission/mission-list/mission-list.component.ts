import { Component, ChangeDetectionStrategy  } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Mission } from 'src/app/shared/interfaces/models';
import { BehaviorSubject, Observable} from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { MissionService, MainNavService } from 'src/app/core/services';
import { TopDefaultNavConfig } from 'src/app/shared/interfaces';
import { Roles } from 'src/app/shared/enums';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionListComponent{
  Roles = Roles;
  private pageInfoSubject = new BehaviorSubject({searchString: "", showFinishedMissions: false, historic: false});

  missions$: Observable<Mission[]>;

  constructor(
    private mainNavService: MainNavService,
    private missionService: MissionService,
    public dialog: MatDialog) { 
      this.configureMainNav();
    }

  ngOnInit(){
    this.missions$ = this.pageInfoSubject.pipe(switchMap(pageInfo => {
        return this.missionService
          .getBy$(x => this.filterMission(x, pageInfo)).pipe(
            map(x => pageInfo.historic ? this.missionService.sortByHistory(x) : this.missionService.sortByDate(x))
          )
      }));
  }

  searchMissionList = (searchString: string) => {
    let pageInfo = {...this.pageInfoSubject.value};
    pageInfo.searchString = searchString;
    this.pageInfoSubject.next(pageInfo)
  }

  private filterMission(mission: Mission, pageInfo: any){
    let exp = mission.finished == pageInfo.showFinishedMissions;
    exp = exp && (!pageInfo.searchString || 
      pageInfo.searchString == null || 
      mission.address.toLowerCase().includes(pageInfo.searchString.toLowerCase()));

    let id = +pageInfo.searchString;
    if(!isNaN(id)) exp = exp || mission.id === id //Search by ID if number
    return exp;
  }

  private toggleFinishedMissions = () => {
    let pageInfo = {...this.pageInfoSubject.value};
    pageInfo.showFinishedMissions = !pageInfo.showFinishedMissions;
    this.pageInfoSubject.next(pageInfo);

    //Toggle icon on nav action on bottom sheet
    let icon = "check_box_outline_blank";
    if(pageInfo.showFinishedMissions) icon = "check_box";
    let cfg = this.mainNavService.getTopDefaultNavConfig();
    cfg.bottomSheetButtons[0].icon = icon;
    this.mainNavService.addTopNavConfig({default: cfg})
  }

  private toggleHistoricOrder = () => {
    let pageInfo = {...this.pageInfoSubject.value};
    pageInfo.historic = !pageInfo.historic;
    this.pageInfoSubject.next(pageInfo);

    //Toggle icon on nav action on bottom sheet
    let color = "color-background";
    if(pageInfo.historic) color = "color-accent";
    let cfg = this.mainNavService.getTopDefaultNavConfig();
    cfg.buttons[0].colorClass = color;
    this.mainNavService.addTopNavConfig({default: cfg})
  }

  private configureMainNav(){
    let cfg = {title:  "Oppdrag"} as TopDefaultNavConfig;
 
    cfg.buttons = [{icon: "history", 
      colorClass: "color-background",
      aria: 'Historisk visning',
      callback: this.toggleHistoricOrder
    }];

    cfg.bottomSheetButtons = [
      {text: "Vis ferdige oppdrag", icon: "check_box_outline_blank", callback: this.toggleFinishedMissions}
    ];

    this.mainNavService.addTopNavConfig({default: cfg});
  }

}
