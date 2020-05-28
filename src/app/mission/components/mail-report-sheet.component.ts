import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared/interfaces';
import { NotificationService, MissionReportService } from 'src/app/core/services';

@Component({
  selector: 'app-mail-report-sheet',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-mail-entity-form [toEmailPreset]="data.toEmailPreset" (formSubmitted)="mailReports($event)"></app-mail-entity-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class MailReportSheetComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(
    private _missionReportService: MissionReportService,   
    private _notificationService: NotificationService,
    private _bottomSheetRef: MatBottomSheetRef<MailReportSheetComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {toEmailPreset: string, ids: number[]}
    ) { }

  ngOnInit() {
    this.navConfig = {
      title: 'Send rapporter',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    }
  }

  close = (result?: boolean) => this._bottomSheetRef.dismiss(result);

  mailReports = (toEmail: string) =>
    this._missionReportService.mailReports$(toEmail, this.data.ids).subscribe(res => { 
      this.close(true);
      this._notificationService.setNotification(`Vellykket! ${this.data.ids.length} ${this.data.ids.length > 1 ? 'rapporter' : 'rapport'} sendt`)
    });
  

}