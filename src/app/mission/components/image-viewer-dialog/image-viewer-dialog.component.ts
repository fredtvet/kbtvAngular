import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MissionImage } from '../../../shared/models/mission-image.model';
import { Roles } from '../../../shared/enums/roles.enum';
import { MatBottomSheet } from '@angular/material';
import { BottomSheetMenuComponent } from '../../../shared/components/bottom-sheet-menu/bottom-sheet-menu.component';
import { AppButton } from '../../../shared/interfaces/app-button.interface';

@Component({
  selector: 'app-image-viewer-dialog',
  animations: [
    trigger('showHideToolbar', [
      state('show', style({
        top:'0px'
      })),
      state('hide', style({
        top:'-56px'
      })),
      transition('show => hide', [
        animate('.1s ease-out')
      ]),
      transition('hide => show', [
        animate('.1s ease-in',)
      ]),
    ]),
    trigger('showHideCounter', [
      state('show', style({
        bottom:'0px'
      })),
      state('hide', style({
        bottom:'-56px'
      })),
      transition('show => hide', [
        animate('.1s ease-out')
      ]),
      transition('hide => show', [
        animate('.1s ease-in',)
      ]),
    ])
  ],
  templateUrl: './image-viewer-dialog.component.html',
  styleUrls: ['./image-viewer-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ImageViewerDialogComponent {
  public Roles = Roles;
  toolbarHidden = false;

  private bottomSheetButtons: AppButton[];

  currentImage: MissionImage;
  index: number;
  images: MissionImage[];

  constructor(
    private dialogRef: MatDialogRef<ImageViewerDialogComponent>,
    private _bottomSheet: MatBottomSheet,
    @Inject(MAT_DIALOG_DATA) private data: any){};

  ngOnInit() {
    this.bottomSheetButtons = [
      {text: "Last ned bilde", icon: "cloud_download", callback: this.downloadImage},
      {text: "Last ned alle", icon: "cloud_download", callback: this.downloadImages},
      {text: "Slett bilde", icon: "delete", callback: this.deleteImage, allowedRoles: [Roles.Leder]}
    ];

    this.images = this.data.images;
    this.index = this.images.findIndex(x => x.id == this.data.imageId);
    this.currentImage = this.images[this.index];
  }

  nextImage(){
    if(this.index >= this.images.length - 1) return null;
    this.index++
    this.currentImage = this.images[this.index];
  }

  previousImage(){
    if(this.index <= 0) return null
    this.index--;
    this.currentImage = this.images[this.index];
  }

  toggleToolBar(){
    this.toolbarHidden = !this.toolbarHidden;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openBottomSheet = () => this._bottomSheet.open(BottomSheetMenuComponent, { data: this.bottomSheetButtons });
  
  private deleteImage = () => {
    this.dialogRef.close(this.currentImage.id);
  }

  private downloadImage = () => {
    window.open(this.currentImage.fileURL)
  }

  private downloadImages = () => {
    this.images.forEach(x => {
      window.open(x.fileURL)
    });
  }

}
