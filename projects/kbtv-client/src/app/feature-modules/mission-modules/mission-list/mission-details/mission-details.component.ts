import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mission } from '@core/models';
import { BottomSheetMenuService } from '@core/services/ui/bottom-sheet-menu.service';
import { ModelState } from '@core/state/model-state.interface';
import { Immutable, Maybe } from 'global-types';
import { ModelFormService } from '@model-form/model-form.service';
import { DateRangePresets, RolePresets, Roles } from '@shared-app/enums';
import { DetailTopNavConfig } from '@shared/components/detail-top-nav-bar/detail-top-nav.config';
import { EditMissionForm } from '@shared/constants/model-forms/save-mission-forms.const';
import { AppFileUrlPipe } from '@shared/pipes/app-file-url.pipe';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MissionListFacade } from '../mission-list.facade';

interface ViewModel { mission: Maybe<Immutable<Mission>>, navConfig: DetailTopNavConfig }

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
    private modelFormService: ModelFormService
  ){ }

  updateHeaderImage = (files: FileList): void => 
    (files && files[0] && this.missionId) ? this.facade.updateHeaderImage(this.missionId, files[0]) : undefined;
  
  private openHeaderImageInput = (): void => this.imageInput?.nativeElement?.click();
  
  private openMissionForm = (entityId: number) => 
    this.modelFormService.open<ModelState, Mission>({ 
      onDeleteUri: "/oppdrag",
      formConfig: {
        dynamicForm: EditMissionForm,
        stateProp: "missions",
        entityId
      }, 
    })

  private goToTimesheets = (mission: Immutable<Mission>) => 
    this.router.navigate(['timer', {
      returnUrl: this.router.url, 
      criteria: JSON.stringify({mission, dateRangePreset: DateRangePresets.ShowAll})
    }], {relativeTo: this.route});

  private openBottomSheetMenu = (mission: Immutable<Mission>) => {   
    this.menuService.open([
      {text: "Rediger", icon: "edit", callback: this.openMissionForm, params: [mission?.id], allowedRoles: [Roles.Leder]},
      {text: `${mission?.fileName ? 'Oppdater' : 'Legg til'} forsidebilde`, icon: "add_photo_alternate", callback: this.openHeaderImageInput, allowedRoles: [Roles.Leder]},
    ]);
  }

  private getNavConfig(mission: Maybe<Immutable<Mission>>): DetailTopNavConfig {
    return {
        titleLines: mission?.address?.split(',').filter(x => x.toLowerCase().replace(/\s/g, '') !== 'norge'),
        subTitle: mission?.finished ? 'Oppdrag ferdig!' : `ID: ${mission?.id}`,
        subIcon: mission?.finished ? 'check' : '',
        imgSrc: this.appFileUrl.transform(mission, "missionheader") || undefined,
        backFn: this.onBack,
        buttons: [
          {icon: "timer", callback: this.goToTimesheets, params: [mission], allowedRoles: RolePresets.Internal},
          {icon: "more_vert", callback: this.openBottomSheetMenu, params: [mission], allowedRoles: RolePresets.Authority},
        ]
    }
  }

  private onBack = () => this.router.navigate(['../../'], {relativeTo: this.route})

}
