import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Mission } from 'src/app/core/models';
import { AppNotifications } from 'src/app/core/services/notification/app.notifications';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { MainNavService } from 'src/app/layout';
import { RolePresets, Roles } from 'src/app/shared-app/enums';
import { AppFileUrlPipe } from 'src/app/shared/pipes/app-file-url.pipe';
import { DetailTopNavComponent } from 'src/app/shared/components';
import { DetailTopNavConfig } from 'src/app/shared/components/detail-top-nav/detail-top-nav-config.interface';
import { MissionListStore } from '../mission-list.store';
import { TimesheetStatus } from 'src/app/shared/enums';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionDetailsComponent{
  @ViewChild('imageInput') imageInput: ElementRef<HTMLElement>;
  RolePresets = RolePresets;
  Roles = Roles;

  mission$: Observable<Mission> = this.store.getWithRelations$(this.missionId).pipe(tap(x => this.configureMainNav(x)));

  get missionId() { return this.route.snapshot.paramMap.get('id') }

  constructor(
    private mainNavService: MainNavService,
    private store: MissionListStore,
    private route: ActivatedRoute,
    private router: Router,
    private appFileUrl: AppFileUrlPipe,
    private notificationService: NotificationService,
  ){ }

  updateHeaderImage = (files: FileList): void => 
    files && files[0] ? this.store.updateHeaderImage(this.missionId, files[0]) : null;
  
  private openHeaderImageInput = (): void =>{ 
    if(!window.navigator.onLine)
      return this.notificationService.notify(AppNotifications.OnlineRequired)
  
    this.imageInput?.nativeElement?.click();
  }
  
  private openMissionForm = (entityId: number) => 
    this.router.navigate(['rediger', {config: JSON.stringify({formConfig:{entityId}, onDeleteUri: "/oppdrag"})}], {relativeTo: this.route});

  private goToTimesheets = (mission: Mission) => 
    this.router.navigate(['mine-timer/liste', {
      returnUrl: this.router.url, 
      initialFilter: JSON.stringify({mission, status: TimesheetStatus.Open})
    }]);

  private configureMainNav(mission: Mission){
    let topNavConfig: DetailTopNavConfig = {
      title: mission?.address?.split(',').filter(x => x.toLowerCase().replace(/\s/g, '') !== 'norge'),
      subTitle: (mission?.finished ? 'Oppdrag ferdig! ' : '') + 'ID: ' + mission?.id,
      subIcon: mission?.finished ? 'check' : '',
      imgSrc: this.appFileUrl.transform(mission, "missionheader"),
      backFn: this.onBack
    };

    topNavConfig.bottomSheetButtons = [  
      {text: "Registrer timer", icon: "timer", callback: this.goToTimesheets, params:[mission], allowedRoles: RolePresets.Internal},
      {text: "Rediger", icon: "edit", callback: this.openMissionForm, params: [mission?.id], allowedRoles: [Roles.Leder]},
      {text: `${mission?.fileName ? 'Oppdater' : 'Legg til'} forsidebilde`, icon: "add_photo_alternate", callback: this.openHeaderImageInput, allowedRoles: [Roles.Leder]},
    ];
 
    this.mainNavService.addConfig({topNavComponent: DetailTopNavComponent, topNavConfig});
  }

  private onBack = () => this.router.navigate(['/oppdrag'])

}
