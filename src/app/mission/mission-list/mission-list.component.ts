import { Component  } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Mission } from 'src/app/shared/models';
import { Roles } from '../../shared/enums';
import { BehaviorSubject, Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MissionService, MainNavService } from 'src/app/core/services';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { AppButton } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-mission-list',
  templateUrl: './mission-list.component.html'
})

export class MissionListComponent extends SubscriptionComponent{
  Roles = Roles;

  //private pageInfo = {searchString: "", showFinishedMissions: false, historic: false}
  private pageInfoSubject = new BehaviorSubject({searchString: "", showFinishedMissions: false, historic: false});

  missions$: Observable<Mission[]>;

  innerNavButtons: AppButton[];
  innerNavTitle: string;

  searchBarHidden: boolean = true;

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
    this.missions$ = this.pageInfoSubject.pipe(switchMap(pageInfo => {
        return this.missionService
          .getFiltered$(pageInfo.showFinishedMissions, pageInfo.searchString, pageInfo.historic)
      }));
  }

  searchMissionList = (searchString: string) => {
    let pageInfo = {...this.pageInfoSubject.value};
    pageInfo.searchString = searchString;
    this.pageInfoSubject.next(pageInfo)
  }

  private createMission = () => this.router.navigate(['oppdrag','ny']);
  


  private toggleFinishedMissions = () => {
    let pageInfo = {...this.pageInfoSubject.value};
    pageInfo.showFinishedMissions = !pageInfo.showFinishedMissions;
    this.pageInfoSubject.next(pageInfo);

    //Toggle icon on nav action on bottom sheet
    let icon = "check_box_outline_blank";
    if(pageInfo.showFinishedMissions) icon = "check_box";
    let cfg = this.mainNavService.getCurrentConfig();
    cfg.bottomSheetButtons = [{text: "Vis ferdige oppdrag", icon: icon, callback: this.toggleFinishedMissions}];
    this.mainNavService.addConfig(cfg);
  }

  private toggleHistoricOrder = () => {
    let pageInfo = {...this.pageInfoSubject.value};
    pageInfo.historic = !pageInfo.historic;
    this.pageInfoSubject.next(pageInfo);

    //Toggle icon on nav action on bottom sheet
    let button = this.innerNavButtons[0];
    button.colorClass = pageInfo.historic ? 'color-accent' : 'color-background';
    this.innerNavTitle = pageInfo.historic ? 'Historikk' : '';
  }

  private configureMainNav(){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = "Oppdrag"
    cfg.bottomSheetButtons = [{text: "Vis ferdige oppdrag", icon: "check_box_outline_blank", callback: this.toggleFinishedMissions}]
    this.mainNavService.addConfig(cfg);
  }

  private configureInnerNav(){
    this.innerNavTitle = '';
    this.innerNavButtons = [         
      {
        icon: "history", 
        colorClass: "color-background",
        aria: 'Historisk visning',
        callback: this.toggleHistoricOrder, 
        allowedRoles: [Roles.Leder, Roles.Mellomleder]
      },
      {
        icon: "add", 
        colorClass: "color-accent",
        text: 'Ny', 
        aria: 'Nytt oppdrag',
        callback: this.createMission, 
        allowedRoles: [Roles.Leder, Roles.Mellomleder]
      },
      
    ]
  }

}
