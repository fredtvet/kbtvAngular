import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from "@angular/core";
import { MatDialog, MatBottomSheet } from "@angular/material";
import { filter, map } from "rxjs/operators";
import { MissionImage } from "src/app/shared/models";
import { Roles } from "src/app/shared/enums";
import { MailImageSheetComponent } from '../../components/mail-image-sheet/mail-image-sheet.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImageWithSelect } from 'src/app/shared/interfaces';
import { ImageViewerDialogWrapperComponent } from '../../components/image-viewer/image-viewer-dialog-wrapper.component';

interface ViewModel {images: ImageWithSelect<MissionImage>[], noSelected: boolean}

@Component({
  selector: "app-image-list",
  templateUrl: "./image-list.component.html",
  styleUrls: ["./image-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ImageListComponent {
  Roles = Roles;

  @Input('images')
  set images(value: MissionImage[]) {
      this.initImages(value);
  }

  private imagesWithSelectSubject = new BehaviorSubject<ImageWithSelect<MissionImage>[]>([]);

  vm$: Observable<ViewModel> = this.imagesWithSelectSubject.asObservable().pipe(
    map(x => {return {images: x,noSelected: !x.some(x => x.selected)}})
  );

  disableImageViewer: boolean = false; //Workaround to prevent ghost clicks on images

  constructor(  
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog) {}

  get imagesCopy() {
    return [...this.imagesWithSelectSubject.value]
  }

  selectOrRemoveImage(image: ImageWithSelect<MissionImage>) {
    this.disableImageViewer = true;
    let images = this.imagesCopy;
    images = images.map(x => {
      if(x.image.id == image.image.id) {
        let copy = {...x};
        copy.selected = !copy.selected
        return copy;
      }else return x;
    });
    this.imagesWithSelectSubject.next(images);
    setTimeout(() => (this.disableImageViewer = false), 500);
  }

  openMailImageSheet = () => {
    let botRef = this.bottomSheet.open(MailImageSheetComponent, {
      data: { ids: this.imagesCopy.map(x => x.image.id) },
    });
    botRef
      .afterDismissed()
      .pipe(filter((isSent) => isSent))
      .subscribe((x) =>  this.clearSelectedImages());
  };
  
  openImageViewer(currentImage: MissionImage) {
    if (this.disableImageViewer || this.isImageSelected(currentImage.id))
      return undefined;

    this.dialog.open(ImageViewerDialogWrapperComponent, {
      width: "100%",
      height: "100%",
      panelClass: "image_viewer_dialog",
      data: { currentImage, images: this.imagesCopy.map(x => x.image) },
    });
  }

  trackById(index: number, img: ImageWithSelect<MissionImage>): number {
    return img.image.id;
  }

  private clearSelectedImages(){
    let copy = this.imagesCopy;
    copy = copy.map(x => {
      if(!x.selected) return x;
      let img = {...x};
      img.selected = false;
      return img;
    })
    this.imagesWithSelectSubject.next(copy);
  }

  private initImages(images: MissionImage[]){
    let imgsWithSelect = images.map(x => {return {image: x, selected: false}})
    this.imagesWithSelectSubject.next(imgsWithSelect);
  }

  private isImageSelected = (imageId:number): boolean => 
    this.imagesCopy.filter(x => x.image.id == imageId && x.selected == true).length ? true : false



}
