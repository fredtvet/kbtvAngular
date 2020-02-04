import { Component, OnInit  } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MissionList, ROLES, Mission, MissionType, NavAction, VertMenuParentExtension } from 'src/app/shared';
import { MissionsService, MissionTypesService, EmployersService, NotificationService } from 'src/app/core';
import { MissionFormComponent } from '../components/mission-form/mission-form.component';
import { forkJoin, combineLatest, of, BehaviorSubject, Subscription } from 'rxjs';
import { MissionListService } from 'src/app/core/services/mission-list.service';
import { skip } from 'rxjs/operators';
import { MainNavConfig } from 'src/app/shared/layout/main-nav/main-nav-config.model';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html',
  styleUrls: ['./mission-list.component.css']
})

export class MissionListComponent extends VertMenuParentExtension{

  ROLES = ROLES;

  private pageInfo = {searchString: "",pageId: 0, onlyActiveMissions: true}
  private pageInfoSubject = new BehaviorSubject(this.pageInfo);

  missionList: MissionList = new MissionList();

  mainNavConfig = new MainNavConfig();

  constructor(
    private _missionsService: MissionsService,
    private _missionListService: MissionListService,
    public dialog: MatDialog,
    private _router: Router) {
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

    let navAction =
      new NavAction("Bare vis aktive oppdrag",
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

  openCreateMissionDialog(){
    const dialogRef = this.dialog.open(MissionFormComponent, {
      width: '80vw',
      height: 'auto',
      panelClass: 'form_dialog',
      data: null,
    });

    dialogRef.afterClosed().subscribe(mission => this.createMission(mission));
  }

  createMission(mission: Mission){
    if(!mission) return null;
    this._missionsService.addMission(mission)
      .subscribe(mission => this._router.navigate(['oppdrag', mission.id, 'detaljer']));
  }

  toggleOnlyActiveMissions(event:string, ctx:any){

    ctx.pageInfo.onlyActiveMissions = !ctx.pageInfo.onlyActiveMissions;
    ctx.pageInfo.pageId = 0;
    ctx.pageInfoSubject.next(ctx.pageInfo);

    //Toggle icon on nav action
    let icon = "check_box_outline_blank";
    if(ctx.pageInfo.onlyActiveMissions) icon = "check_box";

    ctx.vertActions.find(x => x.event == event).icon = icon;
  }

  changePage(pageId){
    this.pageInfo.pageId = pageId;
    this.pageInfoSubject.next(this.pageInfo)
  }

}
