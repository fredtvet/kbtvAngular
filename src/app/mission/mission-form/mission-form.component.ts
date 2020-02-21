import { Component, OnInit } from '@angular/core';
import { MainNavConfig } from 'src/app/shared/layout/main-nav/main-nav-config.model';
import { EmployerService, NotificationService, MissionTypeService, MissionService, LoadingService } from 'src/app/core';
import { Mission, MissionType, Employer } from 'src/app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html'
})
export class MissionFormComponent implements OnInit {

  isCreateForm: boolean = false;
  private missionId: number;

  mainNavConfig = new MainNavConfig();

  mission$: Observable<Mission>;
  missionTypes$: Observable<MissionType[]>;
  employers$: Observable<Employer[]>;

  loading$: Observable<boolean>;

  constructor(
    private employerService: EmployerService,
    private missionTypeService: MissionTypeService,
    private missionService: MissionService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.missionId = +this.route.snapshot.paramMap.get('id');

    this.configureForm();

    this.configureMainNav();
  }

  onSubmit(result: Mission){
    if(!result) this.onBack();
    else if(!this.isCreateForm) this.editMission(result);
    else this.createMission(result);
  }

  createMission(mission: Mission){
    if(!mission) return null;
    this.missionService.add$(mission)
      .subscribe(res => this.goToMission(res.id));
  }

  editMission(mission: Mission){
    if(!mission) return null;
    this.missionService.update$(mission)
      .subscribe(res => {
        this.notificationService.setNotification('Vellykket oppdatering!');
        this.goToMission(res.id);
      })
  }

  private configureForm(){
    if(!this.missionId) this.isCreateForm = true;
    else this.mission$ = this.missionService.get$(this.missionId);

    this.missionTypes$ = this.missionTypeService.getAll$();
    this.employers$ = this.employerService.getAll$();
  }

  private configureMainNav(){
    if(this.isCreateForm) this.mainNavConfig.title = "Nytt oppdrag";
    else this.mainNavConfig.title = "Rediger oppdrag";
    this.mainNavConfig.altNav = false;
    this.mainNavConfig.menuBtnEnabled = false;
  }

  goToMission(id: number){
    this.router.navigate(['oppdrag', id, 'detaljer'])
  }

  onBack(){
    if(!this.isCreateForm) this.goToMission(this.missionId)
    else this.router.navigate(['oppdrag'])
  }

}
