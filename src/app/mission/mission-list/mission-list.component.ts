import { Component  } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Mission } from 'src/app/shared/models';
import { NavAction, VertMenuParent } from 'src/app/shared/components';
import { Roles } from '../../shared/enums';
import { BehaviorSubject, Observable} from 'rxjs';
import { MainNavConfig } from 'src/app/shared/layout';
import { switchMap } from 'rxjs/operators';
import { MissionService } from 'src/app/core/services';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})

export class MissionListComponent extends VertMenuParent{

  Roles = Roles;

  private pageInfo = {searchString: "", showFinishedMissions: false}
  private pageInfoSubject = new BehaviorSubject(this.pageInfo);

  missions$: Observable<Mission[]>;

  mainNavConfig = new MainNavConfig();

  constructor(
    private missionService: MissionService,
    public dialog: MatDialog,
    private router: Router) {
      super();
      this.mainNavConfig.searchBarEnabled = true;
      this.mainNavConfig.vertActions = this.vertActions
    }

  ngOnInit(){

    this.missions$ = this.pageInfoSubject.pipe(switchMap(pageInfo => {
        return this.missionService
          .getFiltered$(pageInfo.showFinishedMissions, pageInfo.searchString)
    }));

    let navAction = new NavAction("Vis ferdige oppdrag",
                      "check_box_outline_blank",
                      "toggleFinishedMissions", this.toggleFinishedMissions,
                      [Roles.Ansatt, Roles.Leder, Roles.Mellomleder, Roles.Oppdragsgiver]);

    this.vertActions.push(navAction);
  }

  searchMissionList(searchString: string){
    this.pageInfo.searchString = searchString;
    this.pageInfoSubject.next(this.pageInfo)
  }

  createMission() {
    this.router.navigate(['oppdrag','ny'])
  }


  private toggleFinishedMissions = (event:string) => {
    this.pageInfo.showFinishedMissions = !this.pageInfo.showFinishedMissions;
    this.pageInfoSubject.next(this.pageInfo);

    //Toggle icon on nav action
    let icon = "check_box_outline_blank";
    if(this.pageInfo.showFinishedMissions) icon = "check_box";

    this.vertActions.find(x => x.event == event).icon = icon;
  }

}
