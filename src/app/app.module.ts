import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import norwayLocale from '@angular/common/locales/nb';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppHammerConfig } from './shared-app/app-hammer-config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppLayoutModule } from './layout/app-layout.module';

registerLocaleData(norwayLocale, 'nb-NO');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,   
    HttpClientModule, 
    AppLayoutModule,
    CoreModule, 
    HammerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [ 
    { provide: LOCALE_ID, useValue: "nb-NO" }, 
    { provide: HAMMER_GESTURE_CONFIG, useClass: AppHammerConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
