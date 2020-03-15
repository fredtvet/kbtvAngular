import { Component  } from '@angular/core';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { Router } from '@angular/router';
import { Mission } from 'src/app/shared/models';
import { NavAction } from 'src/app/shared/components';
import { Roles } from '../../shared/enums';
import { BehaviorSubject, Observable} from 'rxjs';
import { MainNavConfig, BottomSheetParent } from 'src/app/shared/layout';
import { switchMap } from 'rxjs/operators';
import { MissionService, BottomSheetActionHubService } from 'src/app/core/services';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.scss']
})

export class MissionListComponent extends BottomSheetParent{

  Roles = Roles;

  private pageInfo = {searchString: "", showFinishedMissions: false}
  private pageInfoSubject = new BehaviorSubject(this.pageInfo);

  missions$: Observable<Mission[]>;

  mainNavConfig = new MainNavConfig();

  constructor(
    private missionService: MissionService,
    public dialog: MatDialog,
    private router: Router,
    _bottomSheet: MatBottomSheet,
    bottomSheetActionHub: BottomSheetActionHubService) {
      super(bottomSheetActionHub, _bottomSheet);
      this.mainNavConfig.searchBarEnabled = true;
      this.mainNavConfig.bottomSheetActions = this.bottomSheetActions
    }

  ngOnInit(){
    super.ngOnInit();
    this.missions$ = this.pageInfoSubject.pipe(switchMap(pageInfo => {
        return this.missionService
          .getFiltered$(pageInfo.showFinishedMissions, pageInfo.searchString)
    }));

    let navAction = new NavAction("Vis ferdige oppdrag",
                      "check_box_outline_blank",
                      "toggleFinishedMissions", this.toggleFinishedMissions,
                      [Roles.Ansatt, Roles.Leder, Roles.Mellomleder, Roles.Oppdragsgiver]);
                      
    this.mainNavConfig.bottomSheetBtnEnabled = true;
    this.bottomSheetActions.push(navAction);
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

    //Toggle icon on nav action on bottom sheet
    let icon = "check_box_outline_blank";
    if(this.pageInfo.showFinishedMissions) icon = "check_box";
    console.log(this.bottomSheetActions);
    this.bottomSheetActions.find(x => x.event == event).icon = icon;
  }

}
