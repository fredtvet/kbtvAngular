import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { EmployerService, NotificationService, MissionTypeService, MissionService } from 'src/app/core/services';
import { Mission, MissionType, Employer } from 'src/app/shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mission-form',
  templateUrl: './mission-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionFormComponent {

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
    private notificationService: NotificationService) {}

  ngOnInit(): void {
    if(!this.missionIdPreset) this.isCreateForm = true;
    else this.mission$ = this.missionService.get$(this.missionIdPreset);
  }

  onSubmit(result: {mission: Mission, file: File}): void{
    if(!result) this.onFinished(null);
    else if(!this.isCreateForm) this.editMission(result.mission, result.file);
    else this.createMission(result.mission, result.file);
  }

  createMission(mission: Mission, file: File): void{
    if(!mission) return null;
    this.missionService.addMission$(mission, file).subscribe(res => this.onFinished(res.id));
  }

  editMission(mission: Mission, file: File): void{
    if(!mission) return null;
    this.missionService.updateMission$(mission, file).subscribe(res => {
        this.notificationService.setNotification('Vellykket oppdatering!');
        this.onFinished(res.id);
      })
  }

  private onFinished = (id: number): void => this.finished.emit(id);
  

}
