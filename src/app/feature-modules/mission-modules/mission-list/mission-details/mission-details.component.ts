import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Mission } from '@core/models';
import { BottomSheetMenuService } from '@core/services/ui/bottom-sheet-menu.service';
import { NotificationService } from '@notification/index';
import { AppNotifications } from '@shared-app/const/app-notifications.const';
import { RolePresets, Roles } from '@shared-app/enums';
import { DetailTopNavConfig } from '@shared/components/detail-top-nav-bar/detail-top-nav.config';
import { EditMissionForm } from '@shared/constants/model-forms/save-mission-forms.const';
import { TimesheetStatus } from '@shared/enums';
import { AppFileUrlPipe } from '@shared/pipes/app-file-url.pipe';
import { MissionListFacade } from '../mission-list.facade';
import { ModelFormService } from '@model-form/model-form.service';

interface ViewModel { mission: Mission, navConfig: DetailTopNavConfig }

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDetailsComponent{
  @ViewChild('imageInput') imageInput: ElementRef<HTMLElement>;

  get missionId() { return this.route.snapshot.paramMap.get('id') }

  vm$: Observable<ViewModel> =  this.route.paramMap.pipe(
    switchMap(x =>  this.facade.getMissionDetails$(x.get('id'))),
    map(mission => { return {
      navConfig: this.getNavConfig(mission), mission
    }})
  );

  constructor(
    private facade: MissionListFacade,
    private route: ActivatedRoute,
    private router: Router,
    private appFileUrl: AppFileUrlPipe,
    private menuService: BottomSheetMenuService,
    private notificationService: NotificationService,
    private modelFormService: ModelFormService
  ){ }

  updateHeaderImage = (files: FileList): void => 
    files && files[0] ? this.facade.updateHeaderImage(this.missionId, files[0]) : null;
  
  private openHeaderImageInput = (): void =>{ 
    if(!window.navigator.onLine)
      return this.notificationService.notify(AppNotifications.OnlineRequired)
  
    this.imageInput?.nativeElement?.click();
  }
  
  private openMissionForm = (entityId: number) => 
    this.modelFormService.open({ 
      onDeleteUri: "/oppdrag",
      formConfig: {
        dynamicForm: EditMissionForm,
        stateProp: "missions",
        entityId
      }, 
    })

  private goToTimesheets = (mission: Mission) => 
    this.router.navigate(['timer', {
      returnUrl: this.router.url, 
      criteria: JSON.stringify({mission, status: TimesheetStatus.Open})
    }], {relativeTo: this.route});

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

  private onBack = () => this.router.navigate(['../../'], {relativeTo: this.route})

}
