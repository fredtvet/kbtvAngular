import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared-app/interfaces';
import { NotificationService } from 'src/app/core/services';
import { Notifications } from 'src/app/shared-app/enums';
import { MissionDocumentListStore } from './mission-document-list.store';

@Component({
  selector: 'app-mail-document-sheet',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-mail-to-form [toEmailPreset]="data.toEmailPreset" (formSubmitted)="mailDocuments($event)"></app-mail-to-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MailDocumentSheetComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(
    private store: MissionDocumentListStore,   
    private _notificationService: NotificationService,
    private _bottomSheetRef: MatBottomSheetRef<MailDocumentSheetComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {toEmailPreset: string, ids: number[]}
    ) { }

  ngOnInit() {
    this.navConfig = {
      title: 'Send dokumenter',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    }
  }

  close = (result?: boolean) => this._bottomSheetRef.dismiss(result);

  mailDocuments = (toEmail: string) =>
    this.store.mailDocuments$(toEmail, this.data.ids).subscribe(x => { 
      this.close(true);
      this._notificationService.notify({
        title: `Vellykket! ${this.data.ids.length} ${this.data.ids.length > 1 ? 'dokumenter' : 'dokument'} sendt`,
        type: Notifications.Success
      })
    });
  

}