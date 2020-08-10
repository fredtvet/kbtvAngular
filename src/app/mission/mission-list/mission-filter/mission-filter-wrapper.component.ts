import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig, AppButton } from 'src/app/shared-app/interfaces';

@Component({
  selector: 'app-mission-filter-wrapper',
  template: `
  <app-simple-top-nav [config]="navConfig">
    <app-mission-filter (filterUpdated)="close()"></app-mission-filter>
  </app-simple-top-nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionFilterWrapperComponent implements OnInit {

  navConfig: SimpleNavConfig;

  constructor(private bottomSheetRef: MatBottomSheetRef<MissionFilterWrapperComponent>) { }

  ngOnInit() {
    this.navConfig = {
      title: 'Velg filtre',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    }
  }

  close = () => this.bottomSheetRef.dismiss();

}
