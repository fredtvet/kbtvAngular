import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PreloadRouteData } from '@core/services/role-preload.service';
import { CustomRoute } from '@shared-app/interfaces/custom-route.interface';
import { MainSkeletonRouteData } from '@shared/components/main-skeleton/main-skeleton-route-data.interface';
import { AuthRouteData } from 'state-auth';
import { MissionMapComponent } from './mission-map/mission-map.component';

interface MissionMapRoute extends CustomRoute<AuthRouteData & MainSkeletonRouteData & PreloadRouteData>{}

const routes: MissionMapRoute[] = [
  {
    path: '',
    component: MissionMapComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissionMapRoutingModule { }
