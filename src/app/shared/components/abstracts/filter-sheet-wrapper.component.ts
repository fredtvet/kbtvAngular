import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SimpleNavConfig } from 'src/app/shared/interfaces';
import { AppButton } from 'src/app/shared-app/interfaces';
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