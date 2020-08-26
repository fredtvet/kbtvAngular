import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AppButton, SimpleNavConfig } from 'src/app/shared-app/interfaces';
import { OnInit } from '@angular/core';

export abstract class FilterSheetWrapperComponent implements OnInit{

  navConfig: SimpleNavConfig;

  constructor(private _bottomSheetRef: MatBottomSheetRef) { }

  ngOnInit(): void {
    this.navConfig = {
      title: 'Velg filtre',
      leftBtn: {icon: 'close', callback: this.close} as AppButton,
    };
  }
  
  close = (filter?: any) => this._bottomSheetRef.dismiss(filter)
}