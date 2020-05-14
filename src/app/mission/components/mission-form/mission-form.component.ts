import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { EmployerService, NotificationService, MissionTypeService, MissionService, MainNavService } from 'src/app/core/services';
import { Mission, MissionType, Employer } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionFormComponent extends SubscriptionComponent {

  @Input() missionIdPreset: number;
  
  @Output() finished = new EventEmitter();

  mission$: Observable<Mission>;
  missionTypes$: Observable<MissionType[]> = this.missionTypeService.getAll$();
  employers$: Observable<Employer[]> = this.employerService.getAll$();

  isCreateForm: boolean = false;

  constructor(
    private employerService: EmployerService,
    private missionTypeService: MissionTypeService,
    private missionService: MissionService,
    private notificationService: NotificationService) {
      super();
    }

  ngOnInit(): void {
    if(!this.missionIdPreset) this.isCreateForm = true;
    else this.mission$ = this.missionService.get$(this.missionIdPreset);
  }

  onSubmit(result: Mission): void{
    if(!result) this.onFinished(null);
    else if(!this.isCreateForm) this.editMission(result);
    else this.createMission(result);
  }

  createMission(mission: Mission): void{
    if(!mission) return null;
    this.missionService.add$(mission).subscribe(res => this.onFinished(res.id));
  }

  editMission(mission: Mission): void{
    if(!mission) return null;
    this.missionService.update$(mission).subscribe(res => {
        this.notificationService.setNotification('Vellykket oppdatering!');
        this.onFinished(res.id);
      })
  }

  private onFinished = (id: number): void => this.finished.emit(id);
  

}
