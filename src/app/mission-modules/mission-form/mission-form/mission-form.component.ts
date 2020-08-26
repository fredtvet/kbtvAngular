import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Employer, MissionType } from 'src/app/core/models';
import { NotificationService } from 'src/app/core/services';
import { Notifications } from 'src/app/shared-app/enums';
import { CreateMission, UpdateMission } from 'src/app/shared-app/interfaces/commands';
import { MissionFormStore } from '../mission-form.store';
import { MissionFormVm } from '../interfaces/mission-form-vm.interface';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionFormComponent {

  @Input() idPreset: number;
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

    if(!this.idPreset) this.isCreateForm = true;
    else observables.push(this.store.getMissionById$(this.idPreset));

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
    this.store.add$(mission).subscribe(x => this.finished.emit());
  }

  private editMission(mission: UpdateMission): void{
    this.store.update$(mission).subscribe(res => {
        this.notificationService.notify({title: 'Vellykket oppdatering!', type: Notifications.Success});
        this.finished.emit();
      })
  }
 

}
