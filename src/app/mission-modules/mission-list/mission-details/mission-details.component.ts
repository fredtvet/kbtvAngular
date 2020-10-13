import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mission } from 'src/app/core/models';
import { ModelFormService } from 'src/app/core/services/model/form/model-form.service';
import { AppNotifications } from 'src/app/core/services/notification/app.notifications';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { BottomSheetMenuService } from 'src/app/core/services/ui/bottom-sheet-menu.service';
import { RolePresets, Roles } from 'src/app/shared-app/enums';
import { DetailTopNavConfig } from 'src/app/shared/components/detail-top-nav-bar/detail-top-nav.config';
import { MissionFormViewComponent } from 'src/app/shared/components/mission-form-view/mission-form-view.component';
import { TimesheetStatus } from 'src/app/shared/enums';
import { AppFileUrlPipe } from 'src/app/shared/pipes/app-file-url.pipe';
import { MissionListStore } from '../mission-list.store';

interface ViewModel { mission: Mission, navConfig: DetailTopNavConfig }

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDetailsComponent{
  @ViewChild('imageInput') imageInput: ElementRef<HTMLElement>;

  vm$: Observable<ViewModel> = this.store.getWithRelations$(this.missionId).pipe(
    map(mission => { return {
      navConfig: this.getNavConfig(mission), mission
    }})
  );

  get missionId() { return this.route.snapshot.paramMap.get('id') }

  constructor(
    private store: MissionListStore,
    private route: ActivatedRoute,
    private router: Router,
    private appFileUrl: AppFileUrlPipe,
    private menuService: BottomSheetMenuService,
    private notificationService: NotificationService,
    private modelFormService: ModelFormService
  ){ }

  updateHeaderImage = (files: FileList): void => 
    files && files[0] ? this.store.updateHeaderImage(this.missionId, files[0]) : null;
  
  private openHeaderImageInput = (): void =>{ 
    if(!window.navigator.onLine)
      return this.notificationService.notify(AppNotifications.OnlineRequired)
  
    this.imageInput?.nativeElement?.click();
  }
  
  private openMissionForm = (entityId: number) => 
    this.modelFormService.open({
      onDeleteUri: "/oppdrag",
      formConfig: {
        viewComponent: MissionFormViewComponent,
        stateProp: "missions",
        entityId
      }
    })

private goToTimesheets = (mission: Mission) => 
    this.router.navigate(['mine-timer/liste', {
      returnUrl: this.router.url, 
      filter: JSON.stringify({mission, status: TimesheetStatus.Open})
    }]);

  private openBottomSheetMenu = (mission: Mission) => {   
    this.menuService.open([
      {text: "Rediger", icon: "edit", callback: this.openMissionForm, params: [mission?.id], allowedRoles: [Roles.Leder]},
      {text: `${mission?.fileName ? 'Oppdater' : 'Legg til'} forsidebilde`, icon: "add_photo_alternate", callback: this.openHeaderImageInput, allowedRoles: [Roles.Leder]},
    ]);
  }

  private getNavConfig(mission: Mission): DetailTopNavConfig {
    return {
        titleLines: mission?.address?.split(',').filter(x => x.toLowerCase().replace(/\s/g, '') !== 'norge'),
        subTitle: mission?.finished ? 'Oppdrag ferdig!' : `ID: ${mission?.id}`,
        subIcon: mission?.finished ? 'check' : '',
        imgSrc: this.appFileUrl.transform(mission, "missionheader"),
        backFn: this.onBack,
        buttons: [
          {icon: "timer", callback: this.goToTimesheets, params: [mission], allowedRoles: RolePresets.Internal},
          {icon: "more_vert", callback: this.openBottomSheetMenu, params: [mission], allowedRoles: RolePresets.Authority},
        ]
    }
  }

  private onBack = () => this.router.navigate(['/oppdrag', {initialMissionId: this.missionId}])

}
