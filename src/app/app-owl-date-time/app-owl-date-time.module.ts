import { NgModule } from '@angular/core';

import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { DefaultOwlDateTimeIntl } from './default-owl-date-time-intl';
import { DEFAULT_OWL_DATE_TIME_FORMATS } from './default-owl-date-time-formats';
import { LazyStyles } from '../shared-app/enums';
import { CssLoaderService } from '../core/services';



@NgModule({
  declarations: [],
  imports: [
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [   
    {provide: OwlDateTimeIntl, useClass: DefaultOwlDateTimeIntl},
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'no'},
    {provide: OWL_DATE_TIME_FORMATS, useValue: DEFAULT_OWL_DATE_TIME_FORMATS},
  ],
  exports: [   
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ]
})
export class AppOwlDateTimeModule { 
  constructor(private cssLoaderService: CssLoaderService){
    this.cssLoaderService.loadStyle(LazyStyles.OwlDateTime);
  }
}
