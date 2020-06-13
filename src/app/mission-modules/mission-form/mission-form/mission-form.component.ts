import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { EmployerService, NotificationService, MissionTypeService, MissionService } from 'src/app/core/services';
import { Mission, MissionType, Employer } from 'src/app/core/models';
import { Observable } from 'rxjs';
import { CreateMission, UpdateMission } from 'src/app/shared-app/interfaces/commands';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionFormComponent {

  @Input() idPreset: number;
  
  @Output() finished = new EventEmitter();

  mission$: Observable<Mission>;
  missionTypes$: Observable<MissionType[]> = this.missionTypeService.getAll$();
  employers$: Observable<Employer[]> = this.employerService.getAll$();

  isCreateForm: boolean = false;

  constructor(
    private employerService: EmployerService,
    private missionTypeService: MissionTypeService,
    private missionService: MissionService,
    private notificationService: NotificationService) {}

  ngOnInit(): void {
    if(!this.idPreset) this.isCreateForm = true;
    else this.mission$ = this.missionService.get$(this.idPreset);
  }

  onSubmit(result: any): void{
    if(!result || result == null) this.finished.emit(null);
    else if(!this.isCreateForm) this.editMission(result);
    else this.createMission(result);
  }

  private createMission(mission: CreateMission): void{
    this.missionService.addMission$(mission).subscribe(res => this.finished.emit(res.id));
  }

  private editMission(mission: UpdateMission): void{
    this.missionService.updateMission$(mission).subscribe(res => {
        this.notificationService.setNotification('Vellykket oppdatering!');
        this.finished.emit(res.id);
      })
  }
 

}
