import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RolePermissions } from "@core/configurations/role-permissions.const";
import { MissionImage, ModelFile } from '@core/models';
import { DeviceInfoService } from '@core/services/device-info.service';
import { DownloaderService } from '@core/services/downloader.service';
import { BottomSheetMenuService } from '@core/services/ui/bottom-sheet-menu.service';
import { _appFileUrl } from '@shared-app/helpers/app-file-url.helper';
import { _trackByModel } from "@shared-app/helpers/trackby/track-by-model.helper";
import { AppButton } from "@shared-app/interfaces/app-button.interface";
import { SelectableContainerWrapperComponent } from "@shared/components/abstracts/selectable-container-wrapper.component";
import { ImageViewerDialogWrapperConfig } from "@shared/components/image-viewer/image-viewer-dialog-wrapper-config.const";
import { ImageViewerDialogWrapperComponent } from "@shared/components/image-viewer/image-viewer-dialog-wrapper.component";
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { EmailForm } from '@shared/constants/forms/email-form.const';
import { FileFolder } from "@shared/enums/file-folder.enum";
import { ConfirmDialogService } from "confirm-dialog";
import { FormService } from 'form-sheet';
import { ImmutableArray, Maybe } from 'global-types';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { SelectedMissionIdParam } from "../../mission-list/mission-list-route-params.const";
import { MissionImageListFacade } from '../mission-image-list.facade';

interface ViewModel { images: Maybe<ImmutableArray<MissionImage>>, columns: 2 | 4,  fabs: AppButton[], navConfig: MainTopNavConfig }

@Component({
  selector: "app-mission-image-list",
  templateUrl: "./mission-image-list.component.html",
  styleUrls: ["./mission-image-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionImageListComponent extends SelectableContainerWrapperComponent{
  @ViewChild('imageInput') imageInput: ElementRef<HTMLElement>;
  FileFolder = FileFolder;
  private can = RolePermissions.MissionImageList;

  get missionId(): Maybe<string> { 
    return this.route.parent?.parent?.snapshot.paramMap.get(SelectedMissionIdParam)  
  }
  
  vm$: Observable<ViewModel> = combineLatest([
    this.facade.getByMissionId$(this.missionId),
    this.deviceInfoService.isXs$,
    this.currentFabs$
  ]).pipe(
    tap(x => this.images = x[0]),
    map(([images, isXs, fabs]) => { return <ViewModel> { 
      images, columns: isXs ? 2 : 4, fabs, navConfig: this.navConfig
    }})
  )

  private navConfig: MainTopNavConfig;

  private images: Maybe<ImmutableArray<MissionImage>>;

  constructor( 
    private downloaderService: DownloaderService,
    private deviceInfoService: DeviceInfoService,
    private menuService: BottomSheetMenuService,
    private formService: FormService,
    private confirmService: ConfirmDialogService,
    private dialog: MatDialog,
    private facade: MissionImageListFacade,
    private route: ActivatedRoute,
    private router: Router) {
      super();
      this.navConfig = {
        title:  "Bilder",
        backFn: this.onBack,
        buttons: [{icon: "more_vert", callback: this.openBottomSheetMenu}],
      }

      this.staticFabs = [
        {icon: "camera_enhance", aria: 'Ta bilde', color: 'accent', callback: this.openImageInput, allowedRoles: this.can.create}
      ];

      this.selectedItemsFabs = [
        {icon: "send", aria: 'Send', color: 'accent', callback: this.openMailImageSheet, allowedRoles: this.can.sendEmail}, 
        {icon: "delete_forever", aria: 'Slett', color: 'warn', callback: this.openConfirmDeleteDialog, allowedRoles: this.can.delete}
      ]
    }

  openImageViewer(currentImage: ModelFile, images: ModelFile[]) {
    this.dialog.open(ImageViewerDialogWrapperComponent, {
      width: "100%",
      height: "100%",
      panelClass: "image_viewer_dialog",
      data: <ImageViewerDialogWrapperConfig>{
        currentImage, images, fileFolder: FileFolder.MissionImage,
        deleteAction: { 
          callback: (id: string) => this.deleteImages({id}),
          allowedRoles: RolePermissions.MissionImageList.delete
        }
      },
    });
  }

  uploadImages = (files: FileList): void => 
    this.missionId ? this.facade.add({missionId: this.missionId, files}) : undefined;

  trackByImg = _trackByModel("missionImages")

  trackByCol = (index: number, col: number) => col

  private openImageInput = (): void => this.imageInput.nativeElement.click();

  private deleteSelectedImages = () => {
    this.deleteImages({ids: this.currentSelections});     
    this.selectableContainer.resetSelections();
  }

  private deleteImages = (payload: {ids?: string[], id?: string}) => 
    this.facade.delete(payload);

  private  openConfirmDeleteDialog = () => {   
    this.confirmService.open({
      title: "Slett utvalgte bilder?",
      confirmText: 'Slett',
      confirmCallback: this.deleteSelectedImages
    })
  }
  
  private openMailImageSheet = () => {
    this.formService.open({
      formConfig: {...EmailForm, initialValue: {email: this.facade.mission?.employer?.email }}, 
      navConfig: {title: "Send bilder"},
      submitCallback: (val: EmailForm) => { 
        this.facade.mailImages(val.email, this.currentSelections);
        this.selectableContainer.resetSelections();
      },
    })
  }

  private openBottomSheetMenu = () => {   
    this.menuService.open([
      {icon:'send', text:'Send alle bilder', callback: this.openMailImageSheet, allowedRoles: this.can.sendEmail},
      {icon: "cloud_download", text: "Last ned alle", callback: this.downloadImages, params: [this.images]},
    ]);
  }

  private downloadImages = (imgs: MissionImage[]) => 
    this.downloaderService.downloadUrls(imgs.map(x => x.fileName ? _appFileUrl(x.fileName, FileFolder.MissionImageOriginal) : null));

  private onBack = () => this.router.navigate(['../'], {relativeTo: this.route.parent});
  
 
}
