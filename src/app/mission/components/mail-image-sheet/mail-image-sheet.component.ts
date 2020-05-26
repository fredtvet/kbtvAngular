import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared/interfaces';
import { MissionImageService, NotificationService, EmployerService } from 'src/app/core/services';

@Component({
  selector: 'app-mail-image-sheet',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <mat-form-field>
      <input matInput placeholder="Epost" [(ngModel)]="data.toEmail">
    </mat-form-field>
    <button mat-button (click)="mailImages()">Send</button>
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
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {toEmail: string, ids: number[]}
    ) { }

  ngOnInit() {
    this.navConfig = {
      title: 'Send bilder',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    }
  }

  close = (result?: boolean) => this._bottomSheetRef.dismiss(result);

  mailImages = () => this.close(true);
    // this._missionImageService.mailImages$(this.data.toEmail, this.data.ids).subscribe(res => { 
    //   this.close(true);
    //   this._notificationService.setNotification('Vellykket! Bilder sendt')
    // });
  

}