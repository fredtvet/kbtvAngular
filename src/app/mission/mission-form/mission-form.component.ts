import { Component } from '@angular/core';
import { MainNavConfig } from 'src/app/shared/layout';
import { EmployerService, NotificationService, MissionTypeService, MissionService, SessionService } from 'src/app/core/services';
import { Mission, MissionType, Employer } from 'src/app/shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html'
})
export class MissionFormComponent extends SubscriptionComponent {

  mainNavConfig = new MainNavConfig();
  isCreateForm: boolean = false;

  private returnRoute: string;
  private missionId: number;

  mission$: Observable<Mission>;
  missionTypes$: Observable<MissionType[]>;
  employers$: Observable<Employer[]>;

  loading$: Observable<boolean>;

  constructor(
    private sessionService: SessionService,
    private employerService: EmployerService,
    private missionTypeService: MissionTypeService,
    private missionService: MissionService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router) {
      super();
      this.returnRoute = this.route.snapshot.params['returnRoute'];
    }

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
    this.missionService.add$(mission).pipe(take(1))
      .subscribe(res => this.onFinished(res.id));
  }

  editMission(mission: Mission){
    if(!mission) return null;
    this.missionService.update$(mission).pipe(take(1))
      .subscribe(res => {
        this.notificationService.setNotification('Vellykket oppdatering!');
        this.onFinished(res.id);
      })
  }

  private configureForm(){
    if(!this.missionId) this.isCreateForm = true;
    else this.mission$ = this.missionService.get$(this.missionId).pipe(takeUntil(this.unsubscribe));

    this.missionTypes$ = this.missionTypeService.getAll$().pipe(takeUntil(this.unsubscribe));
    this.employers$ = this.employerService.getAll$().pipe(takeUntil(this.unsubscribe));
  }

  private configureMainNav(){
    if(this.isCreateForm) this.mainNavConfig.title = "Nytt oppdrag";
    else this.mainNavConfig.title = "Rediger oppdrag";
    this.mainNavConfig.altNav = false;
    this.mainNavConfig.menuBtnEnabled = false;
  }

  private onFinished(id: number){
    if(this.returnRoute != undefined) this.router.navigate([this.returnRoute])
    else this.router.navigate(['oppdrag', id, 'detaljer'])
  }

  onBack(){
    if(this.returnRoute != undefined) this.router.navigate([this.returnRoute])
    else if(!this.isCreateForm) this.router.navigate(['oppdrag',this.missionId, 'detaljer'])
    else this.router.navigate(['oppdrag'])
  }

}
