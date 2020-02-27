import { Component  } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ROLES, NavAction, VertMenuParent, Mission } from 'src/app/shared';
import { BehaviorSubject, Observable} from 'rxjs';
import { MainNavConfig } from 'src/app/shared/layout/main-nav/main-nav-config.model';
import { switchMap } from 'rxjs/operators';
import { MissionService } from 'src/app/core';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})

export class MissionListComponent extends VertMenuParent{

  ROLES = ROLES;

  private pageInfo = {searchString: "", onlyActiveMissions: true}
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

    this.missions$ = this.pageInfoSubject.pipe(switchMap(pageInfo => {console.log(pageInfo)
        return this.missionService
          .getFiltered$(pageInfo.onlyActiveMissions, pageInfo.searchString)
    }));

    let navAction = new NavAction("Bare vis aktive oppdrag",
                      "check_box",
                      "toggleOnlyActiveMissions", this.toggleOnlyActiveMissions,
                      [ROLES.Ansatt, ROLES.Leder, ROLES.Mellomleder, ROLES.Oppdragsgiver]);

    this.vertActions.push(navAction);
  }

  searchMissionList(searchString: string){
    this.pageInfo.searchString = searchString;
    this.pageInfoSubject.next(this.pageInfo)
  }

  createMission() {
    this.router.navigate(['oppdrag','ny'])
  }


  private toggleOnlyActiveMissions = (event:string) => {

    this.pageInfo.onlyActiveMissions = !this.pageInfo.onlyActiveMissions;
    this.pageInfoSubject.next(this.pageInfo);

    //Toggle icon on nav action
    let icon = "check_box_outline_blank";
    if(this.pageInfo.onlyActiveMissions) icon = "check_box";

    this.vertActions.find(x => x.event == event).icon = icon;
  }

}
