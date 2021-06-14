import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolePermissions } from '@core/configurations/role-permissions.const';
import { Mission } from '@core/models';
import { Roles } from '@core/roles.enum';
import { ModelState } from '@core/state/model-state.interface';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { DateRangePresets } from '@shared-app/enums/date-range-presets.enum';
import { FileFolder } from '@shared-app/enums/file-folder.enum';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { WithUnsubscribe } from '@shared-app/mixins/with-unsubscribe.mixin';
import { ImageViewerDialogService } from '@shared-mission/components/image-viewer/image-viewer-dialog.service';
import { EditMissionModelForm } from '@shared-mission/forms/save-mission-model-form.const';
import { BottomIconButtons } from '@shared/constants/bottom-icon-buttons.const';
import { Immutable, Maybe } from 'global-types';
import { ModelFormService } from 'model/form';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserTimesheetListCriteriaQueryParam } from 'src/app/feature-modules/timesheet-modules/user-timesheet-list/user-timesheet-list/user-timesheet-list-route-params.const';
import { SelectedMissionIdParam } from '../mission-list-route-params.const';
import { MissionListFacade } from '../mission-list.facade';

interface ViewModel { mission: Maybe<Immutable<Mission>>, bottomActions: AppButton[] }

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDetailsComponent extends WithUnsubscribe() {
  @ViewChild('headerImageInput') headerImageInput: ElementRef<HTMLElement>;
  @ViewChild('missionImageInput') missionImageInput: ElementRef<HTMLElement>;

  FileFolder = FileFolder;
  Roles = Roles;
  
  baseHeaderImgButton: Partial<AppButton> = {type: ButtonTypes.Stroked}

  private can = RolePermissions.MissionList;

  get missionId() { return this.route.snapshot.paramMap.get(SelectedMissionIdParam) }

  vm$: Observable<ViewModel> =  this.route.paramMap.pipe(
    switchMap(x =>  this.facade.getMissionDetails$(x.get(SelectedMissionIdParam))),
    tap(x => x == null ? this.router.navigate(['oppdrag']) : null),
    map(mission => { return { 
      bottomActions: this.getBottomActions(mission), 
      mission
    }})
  );

  addHeaderImgBtn: AppButton = {
    text: "Legg til forsidebilde", 
    icon: "add_photo_alternate", 
    callback: () => this.openImageInput(this.headerImageInput), 
    allowedRoles: this.can.update
  };

  actionFab: AppButton = {
    icon: "camera_enhance", 
    callback: () => this.openImageInput(this.missionImageInput),
  }

  constructor(
    private facade: MissionListFacade,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private imageViewer: ImageViewerDialogService,
    private modelFormService: ModelFormService<ModelState>
  ) { super() }

  updateHeaderImage = (files: FileList): void => 
    (files?.length && this.missionId) ? this.facade.updateHeaderImage(this.missionId, files[0]) : undefined;

  addMissionImages = (files: FileList): void => 
    (files?.length && this.missionId) ? this.facade.addMissionImages(this.missionId, files) : undefined;

  openImageViewer(mission: Mission) {
    this.imageViewer.open({currentImage: mission, fileFolder: FileFolder.MissionHeader})
  }
 
  private openImageInput = (ref: ElementRef<HTMLElement>): void => ref?.nativeElement?.click();

  private openMissionForm = (id: string | undefined) => 
    this.modelFormService.open(EditMissionModelForm, {id})

  private goToTimesheets = (mission: Maybe<Immutable<Mission>>) => 
    this.router.navigate(['timer', {
      returnUrl: this.router.url, 
      [UserTimesheetListCriteriaQueryParam]: JSON.stringify({mission, dateRangePreset: DateRangePresets.ShowAll})
    }], {relativeTo: this.route});

  private getBottomActions(mission: Maybe<Immutable<Mission>>): AppButton[] {
    return  [
      {icon: "timer", text: "Timer", callback: () => this.goToTimesheets(mission), allowedRoles: RolePermissions.UserTimesheetList.access},
      // {icon: "more_vert", callback: this.openBottomSheetMenu, params: [mission], allowedRoles: this.can.update},
      {...BottomIconButtons.Edit, callback: () => this.openMissionForm(mission?.id), allowedRoles: this.can.update},
      {...this.addHeaderImgBtn, text: 'Nytt forsidebilde'}
    ]
  }

}
