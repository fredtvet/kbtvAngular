import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import norwayLocale from '@angular/common/locales/nb';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeTopNavComponent } from './home/home-top-nav.component';
import { HomeComponent } from './home/home.component';
import { AppLayoutModule } from './layout/app-layout.module';
import { AppHammerConfig } from './shared-app/app-hammer-config';
import { SharedAppModule } from './shared-app/shared-app.module';
import { ValidationErrorMessages } from './shared-app/validation-error-messages.const';
import { VALIDATION_ERROR_MESSAGES } from './shared/dynamic-form/validation-error-map.interface';

registerLocaleData(norwayLocale, 'nb-NO');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeTopNavComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,   
    HttpClientModule, 
    AppLayoutModule,
    SharedAppModule,
    CoreModule, 
    HammerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [     
    { provide: LOCALE_ID, useValue: "nb-NO" }, 
    { provide: HAMMER_GESTURE_CONFIG, useClass: AppHammerConfig},
    { provide: VALIDATION_ERROR_MESSAGES, useValue: ValidationErrorMessages},
    {provide: LocationStrategy, useClass: HashLocationStrategy},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {  }
