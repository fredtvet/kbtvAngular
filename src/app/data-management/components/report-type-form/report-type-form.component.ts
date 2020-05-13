import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ReportTypeService } from 'src/app/core/services';
import { MissionReportType } from 'src/app/shared/models';

@Component({
  selector: 'app-report-type-form',
  templateUrl: './report-type-form.component.html'
})
export class ReportTypeFormComponent implements OnInit {
  
  @Output() finished = new EventEmitter();

  constructor(private reportTypeService: ReportTypeService) { }

  ngOnInit() {
  }

  onSubmit = (reportType: MissionReportType) => {
    if(!reportType) this.finished.emit();
    else this.reportTypeService.add$(reportType).subscribe(x => this.finished.emit(x));
  }
}
