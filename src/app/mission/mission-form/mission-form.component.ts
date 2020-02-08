import { Component, OnInit } from '@angular/core';
import { MainNavConfig } from 'src/app/shared/layout/main-nav/main-nav-config.model';
import { MissionTypesService, EmployersService, MissionsService, NotificationService } from 'src/app/core';
import { Mission, MissionType, Employer } from 'src/app/shared';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  styleUrls: ['./mission-form.component.scss']
})
export class MissionFormComponent implements OnInit {

  private isCreateForm: boolean = false;

  mainNavConfig = new MainNavConfig();

  mission: Mission = null;
  missionTypes: MissionType[] = [];
  employers: Employer[] = [];

  constructor(
    private employersService: EmployersService,
    private missionTypesService: MissionTypesService,
    private missionsService: MissionsService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    if(!id) this.isCreateForm = true;
    else this.missionsService.getMissionDetails(+id)
            .subscribe(result => this.mission = result.mission);

    this.employersService.getAll$().subscribe(result => this.employers = result);
    this.missionTypesService.getAll$().subscribe(result => this.missionTypes = result);

    this.configureMainNav();
  }

  onSubmit(result: Mission){
    if(!result) this.onBack();
    else if(!this.isCreateForm) this.editMission(result);
    else this.createMission(result);
  }

  createMission(mission: Mission){
    if(!mission) return null;
    this.missionsService.addMission(mission)
      .subscribe(res => this.goToMission(res.id));
  }

  editMission(mission: Mission){
    if(!mission) return null;
    this.missionsService.updateMission(mission)
      .subscribe(res => {
        this.notificationService.setNotification('Vellykket oppdatering!');
        this.goToMission(res.id);
      })
  }

  goToMission(id: number){
    this.router.navigate(['oppdrag', id, 'detaljer'])
  }

  configureMainNav(){
    if(this.isCreateForm) this.mainNavConfig.title = "Nytt oppdrag";
    else this.mainNavConfig.title = "Rediger oppdrag";
    this.mainNavConfig.altNav = false;
    this.mainNavConfig.menuBtnEnabled = false;
  }

  onBack(){
    if(!this.isCreateForm) this.goToMission(this.mission.id)
    else this.router.navigate(['oppdrag'])
  }
}
