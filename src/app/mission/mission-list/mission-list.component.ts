import { Component  } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MissionList, ROLES, Mission, NavAction, VertMenuParentExtension } from 'src/app/shared';
import { MissionsService} from 'src/app/core';
import { BehaviorSubject} from 'rxjs';
import { MissionListService } from 'src/app/core/services/mission-list.service';
import { MainNavConfig } from 'src/app/shared/layout/main-nav/main-nav-config.model';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})

export class MissionListComponent extends VertMenuParentExtension{

  ROLES = ROLES;

  private pageInfo = {searchString: "",pageId: 0, onlyActiveMissions: true}
  private pageInfoSubject = new BehaviorSubject(this.pageInfo);

  missionList: MissionList = new MissionList();

  mainNavConfig = new MainNavConfig();

  constructor(
    private _missionListService: MissionListService,
    public dialog: MatDialog,
    private router: Router) {
      super();
      this.mainNavConfig.searchBarEnabled = true;
      this.mainNavConfig.vertActions = this.vertActions
    }

  ngOnInit(){
    this.pageInfoSubject.subscribe(pageInfo => {
        this._missionListService
          .getMissionsPaginated(pageInfo.onlyActiveMissions, pageInfo.pageId, pageInfo.searchString)
          .subscribe(result => this.missionList = result);
    })

    let navAction = new NavAction("Bare vis aktive oppdrag",
                      "check_box",
                      "toggleOnlyActiveMissions", this.toggleOnlyActiveMissions,
                      [ROLES.Ansatt, ROLES.Leder, ROLES.Mellomleder, ROLES.Oppdragsgiver]);

    this.vertActions.push(navAction);
  }

  searchMissionList(searchString){
    this.pageInfo.searchString = searchString;
    this.pageInfo.pageId = 0;
    this.pageInfoSubject.next(this.pageInfo)
  }

  createMission() {
    this.router.navigate(['oppdrag/ny'])
  }


  private toggleOnlyActiveMissions = (event:string) => {

    this.pageInfo.onlyActiveMissions = !this.pageInfo.onlyActiveMissions;
    this.pageInfo.pageId = 0;
    this.pageInfoSubject.next(this.pageInfo);

    //Toggle icon on nav action
    let icon = "check_box_outline_blank";
    if(this.pageInfo.onlyActiveMissions) icon = "check_box";

    this.vertActions.find(x => x.event == event).icon = icon;
  }

  changePage(pageId){
    this.pageInfo.pageId = pageId;
    this.pageInfoSubject.next(this.pageInfo)
  }

}
