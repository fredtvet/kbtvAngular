import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { SimpleNavConfig } from 'src/app/shared/interfaces';
import { AppButton } from 'src/app/shared-app/interfaces';
import { MissionImageListStore } from './mission-image-list.store';
import { NotificationType, NotificationService } from 'src/app/core/services/notification';

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
    private store: MissionImageListStore,   
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
    this.store.mailImages$(toEmail, this.data.ids).subscribe(x => { 
      this.close(true);
      this._notificationService.notify({
        title:`Vellykket! ${this.data?.ids?.length} ${this.data?.ids?.length > 1 ? 'bilder' : 'bilde'} sendt`,
        type: NotificationType.Success
      })
    });
  

}