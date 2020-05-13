import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MissionReportType } from 'src/app/shared/models';
import { ReportTypeService, MissionReportService } from 'src/app/core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mission-report-form',
  templateUrl: './mission-report-form.component.html'
})

export class MissionReportFormComponent{
  @Input() missionId: number;
  @Output() finished = new EventEmitter();

  reportTypes$: Observable<MissionReportType[]>;

  constructor(
    private missionReportService: MissionReportService,
    private reportTypeService: ReportTypeService) {}

  ngOnInit() {
    this.reportTypes$ = this.reportTypeService.getAll$();
  }

  onSubmit(data:any){  
    if(!data || !this.missionId) this.finished.emit();
    else this.missionReportService.addReport$(this.missionId, data.reportType, data.files).subscribe(x => this.finished.emit(x)) 
  }

}
