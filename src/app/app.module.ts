import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserModule, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { registerLocaleData, DatePipe } from '@angular/common';
import norwayLocale from '@angular/common/locales/nb';
import { HomeComponent } from './home/home.component';
import { AppLayoutModule } from './layout/app-layout.module';
import { AppHammerConfig } from './app-hammer-config';

registerLocaleData(norwayLocale, 'nb-NO');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
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
    DatePipe,
    { provide: LOCALE_ID, useValue: "nb-NO" }, 
    { provide: HAMMER_GESTURE_CONFIG, useClass: AppHammerConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
