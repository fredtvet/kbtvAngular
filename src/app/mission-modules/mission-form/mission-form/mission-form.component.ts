import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employer, MissionType } from 'src/app/core/models';
import { MissionFormStore } from '../mission-form.store';
import { MissionFormVm } from '../interfaces/mission-form-vm.interface';
import { FormConfig } from 'src/app/shared/interfaces';
import { FormAction } from 'src/app/shared/enums';
import { NotificationService, NotificationType } from 'src/app/core/services/notification';
import { CreateMission, UpdateMission } from '../interfaces/mission-commands.interface';

@Component({
  selector: 'app-mission-form',
  template: `
  <app-mission-form-view
    [vm]="vm$ | async"
    (formSubmitted)="onSubmit($event)">
  </app-mission-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionFormComponent {

  @Input() config: FormConfig;
  @Output() finished = new EventEmitter();

  vm$: Observable<MissionFormVm>;
  
  isCreateForm: boolean = false;

  constructor(
    private store: MissionFormStore,
    private notificationService: NotificationService) {}

  ngOnInit(): void {
    let observables: Observable<any>[] = [
      this.store.property$<MissionType[]>("missionTypes"),
      this.store.property$<Employer[]>("employers")
    ];

    if(!this.config?.entityId) this.isCreateForm = true;
    else observables.push(this.store.getMissionById$(this.config?.entityId));

    this.vm$ = combineLatest(...observables).pipe(map(([missionTypes, employers, mission]) => { 
      if(mission){
        mission.missionType = missionTypes?.find(x => x.id === mission.missionTypeId);   
        mission.employer = employers?.find(x => x.id === mission.employerId);
      }
      return {missionTypes, employers, mission}
    }))
  }

  onSubmit(result: any): void{
    if(!result || result == null) this.finished.emit(null);
    else if(!this.isCreateForm) this.editMission(result);
    else this.createMission(result);
  }

  private createMission(mission: CreateMission): void{
    this.store.add$(mission).subscribe(x => this.finished.emit(FormAction.Create));
  }

  private editMission(mission: UpdateMission): void{
    this.store.update$(mission).subscribe(res => {
        this.notificationService.notify({title: 'Vellykket oppdatering!', type: NotificationType.Success});
        this.finished.emit(FormAction.Update);
      })
  }

}
