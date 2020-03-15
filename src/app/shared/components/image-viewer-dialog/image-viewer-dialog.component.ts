import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MissionImage } from '../../models/mission-image.model';
import { NavAction } from '../nav-action.model';
import { Roles } from '../../enums/roles.enum';
import { MatBottomSheet } from '@angular/material';
import { BottomSheetParent } from '../../layout/bottom-sheet/bottom-sheet-parent.extension';
import { BottomSheetActionHubService } from 'src/app/core/services/ui/bottom-sheet-action-hub.service';

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
  styleUrls: ['./image-viewer-dialog.component.scss']
})
export class ImageViewerDialogComponent extends BottomSheetParent {
  public Roles = Roles;
  toolbarHidden = false;

  public currentImage: MissionImage;
  public index: number;
  public images: MissionImage[];

  constructor(
    public dialogRef: MatDialogRef<ImageViewerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,   
    _bottomSheet: MatBottomSheet,
    bottomSheetActionHub: BottomSheetActionHubService,
  ){ super(bottomSheetActionHub, _bottomSheet) };

  ngOnInit() {
    super.ngOnInit();
    this.images = this.data.images;
    this.index = this.images.findIndex(x => x.id == this.data.imageId);
    this.currentImage = this.images[this.index];

    this.bottomSheetActions = [
      new NavAction("Last ned bilde", "cloud_download", "downloadImage", this.downloadImage),
      new NavAction("Last ned alle", "cloud_download", "downloadImages", this.downloadImages),
      new NavAction("Slett bilde", "delete_forever", "delete", this.deleteImage, [Roles.Leder]),
    ];
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

  private deleteImage = (e:string) => {
    this.dialogRef.close(this.currentImage.id);
  }

  private downloadImage = (e:string) => {
    window.open(this.currentImage.fileURL)
  }

  private downloadImages = (e:string) => {
    this.images.forEach(x => {
      window.open(x.fileURL)
    });
  }

}
