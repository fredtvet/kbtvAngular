import { Component } from '@angular/core';
import { EmployerService, NotificationService, MissionTypeService, MissionService, MainNavService } from 'src/app/core/services';
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

  isCreateForm: boolean = false;

  private returnRoute: string;
  private missionId: number;

  mission$: Observable<Mission>;
  missionTypes$: Observable<MissionType[]>;
  employers$: Observable<Employer[]>;

  loading$: Observable<boolean>;

  constructor(
    private mainNavService: MainNavService,
    private employerService: EmployerService,
    private missionTypeService: MissionTypeService,
    private missionService: MissionService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router) {
      super();
      this.returnRoute = this.route.snapshot.params['returnRoute'];
      this.missionId = +this.route.snapshot.paramMap.get('id');
      if(!this.missionId) this.isCreateForm = true;
      this.configureMainNav();
    }

  ngOnInit(): void {
    this.initalizeObservables();
  }

  onSubmit(result: Mission): void{
    if(!result) this.onBack();
    else if(!this.isCreateForm) this.editMission(result);
    else this.createMission(result);
  }

  createMission(mission: Mission): void{
    if(!mission) return null;
    this.missionService.add$(mission).subscribe(res => this.onFinished(res.id));
  }

  editMission(mission: Mission): void{
    if(!mission) return null;
    this.missionService.update$(mission).pipe(take(1))
      .subscribe(res => {
        this.notificationService.setNotification('Vellykket oppdatering!');
        this.onFinished(res.id);
      })
  }

  private initalizeObservables(): void{
    if(!this.isCreateForm) 
      this.mission$ = this.missionService.get$(this.missionId).pipe(takeUntil(this.unsubscribe));

    this.missionTypes$ = this.missionTypeService.getAll$().pipe(takeUntil(this.unsubscribe));
    this.employers$ = this.employerService.getAll$().pipe(takeUntil(this.unsubscribe));
  }

  private onFinished(id: number): void{
    if(this.returnRoute != undefined) this.router.navigate([this.returnRoute])
    else this.router.navigate(['oppdrag', id, 'detaljer'])
  }

  private onBack = (): void => {
    if(this.returnRoute != undefined) this.router.navigate([this.returnRoute])
    else if(!this.isCreateForm) this.router.navigate(['oppdrag',this.missionId, 'detaljer'])
    else this.router.navigate(['oppdrag'])
  }

  private configureMainNav(): void{
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.title = this.isCreateForm ?  "Nytt oppdrag" : "Rediger oppdrag";
    cfg.menuBtnEnabled = false;
    cfg.backFn = this.onBack;
    this.mainNavService.addConfig(cfg);
  }
}
