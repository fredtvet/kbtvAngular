import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import norwayLocale from '@angular/common/locales/nb';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NotificationModule } from 'notification';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeBottomBarComponent } from './home/home-bottom-bar/home-bottom-bar.component';
import { HomeComponent } from './home/home.component';
import { AppLayoutModule } from './layout/app-layout.module';
import { AppHammerConfig } from './core/configurations/app-hammer-config';
import { SharedAppModule } from './shared-app/shared-app.module';
import { HomeNavTileGridComponent } from './home/home-nav-tile-grid.component';
import { HomeHeaderComponent } from './home/home-header/home-header.component';

registerLocaleData(norwayLocale, 'nb-NO');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeBottomBarComponent,
    HomeNavTileGridComponent,
    HomeHeaderComponent
  ],
  imports: [
    BrowserAnimationsModule,   
    HttpClientModule, 
    CoreModule, 
    HammerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule, 
    AppLayoutModule,
    SharedAppModule,
    NotificationModule
  ],
  providers:[ 
    { provide: LOCALE_ID, useValue: "nb-NO" }, 
    { provide: HAMMER_GESTURE_CONFIG, useClass: AppHammerConfig},
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {  }
