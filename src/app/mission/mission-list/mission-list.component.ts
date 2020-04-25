import { Component  } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Mission } from 'src/app/shared/models';
import { Roles } from '../../shared/enums';
import { BehaviorSubject, Observable} from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { MissionService, MainNavService } from 'src/app/core/services';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { AppButton } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html'
})

export class MissionListComponent extends SubscriptionComponent{
  Roles = Roles;

  private pageInfo = {searchString: "", showFinishedMissions: false}
  private pageInfoSubject = new BehaviorSubject(this.pageInfo);

  missions$: Observable<Mission[]>;

  innerNavButtons: AppButton[];

  constructor(
    private mainNavService: MainNavService,
    private missionService: MissionService,
    public dialog: MatDialog,
    private router: Router) {
      super();  
      this.configureMainNav();
      this.configureInnerNav();
    }

  ngOnInit(){
    this.missions$ = this.pageInfoSubject.pipe(
      switchMap(pageInfo => {
        return this.missionService
          .getFiltered$(pageInfo.showFinishedMissions, pageInfo.searchString)
      }), 
      takeUntil(this.unsubscribe)
    );
  }

  private createMission = () => this.router.navigate(['oppdrag','ny']);
  
  private searchMissionList = (searchString: string) => {
    this.pageInfo.searchString = searchString;
    this.pageInfoSubject.next(this.pageInfo)
  }

  private toggleFinishedMissions = () => {
    this.pageInfo.showFinishedMissions = !this.pageInfo.showFinishedMissions;
    this.pageInfoSubject.next(this.pageInfo);

    //Toggle icon on nav action on bottom sheet
    let icon = "check_box_outline_blank";
    if(this.pageInfo.showFinishedMissions) icon = "check_box";
    let cfg = this.mainNavService.getCurrentConfig();
    cfg.bottomSheetButtons = [{text: "Vis ferdige oppdrag", icon: icon, callback: this.toggleFinishedMissions}];
    this.mainNavService.addConfig(cfg);
  }

  private configureMainNav(){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Oppdrag"
    cfg.bottomSheetButtons = [{text: "Vis ferdige oppdrag", icon: "check_box_outline_blank", callback: this.toggleFinishedMissions}]
    cfg.searchFn = this.searchMissionList;
    this.mainNavService.addConfig(cfg);
  }

  private configureInnerNav(){
    this.innerNavButtons = [
      {
        icon: "add", 
        colorClass: "color-accent",
        text: 'Ny', 
        aria: 'Nytt oppdrag',
        callback: this.createMission, 
        allowedRoles: [Roles.Leder, Roles.Mellomleder]
      }
    ]
  }

}
