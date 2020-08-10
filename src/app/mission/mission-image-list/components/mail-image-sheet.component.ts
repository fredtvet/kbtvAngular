import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared-app/interfaces';
import { MissionImageService, NotificationService } from 'src/app/core/services';
import { Notifications } from 'src/app/shared-app/enums';

@Component({
  selector: 'app-mail-image-sheet',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-mail-to-form [toEmailPreset]="data.toEmailPreset" (formSubmitted)="mailImages($event)"></app-mail-to-form>
  </app-simple-top-nav> 
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class MailImageSheetComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(
    private _missionImageService: MissionImageService,   
    private _notificationService: NotificationService,
    private _bottomSheetRef: MatBottomSheetRef<MailImageSheetComponent>,  
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {toEmailPreset: string, ids: number[]}
    ) { }

  ngOnInit() {
    this.navConfig = {
      title: 'Send bilder',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    }
  }

  close = (result?: boolean) => this._bottomSheetRef.dismiss(result);

  mailImages = (toEmail: string) =>
    this._missionImageService.mailImages$(toEmail, this.data.ids).subscribe(res => { 
      this.close(true);
      this._notificationService.notify({
        title:`Vellykket! ${this.data.ids.length} ${this.data.ids.length > 1 ? 'bilder' : 'bilde'} sendt`,
        type: Notifications.Success
      })
    });
  

}