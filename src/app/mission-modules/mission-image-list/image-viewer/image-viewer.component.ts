import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetMenuComponent } from 'src/app/shared-app/components';
import { AppButton } from 'src/app/shared-app/interfaces';
import { AppFile } from 'src/app/core/models';

@Component({
  selector: 'app-image-viewer',
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
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ImageViewerComponent {
  toolbarHidden = false;

  @Input() images: AppFile[];
  @Input() currentImage: AppFile;
  @Input() actions: AppButton[];
  
  @Output() imageDeleted = new EventEmitter();
  @Output() currentImageChanged = new EventEmitter();
  @Output() close = new EventEmitter();

  index: number;

  constructor(private bottomSheet: MatBottomSheet){};

  ngOnInit() {
    if(this.currentImage)
      this.index = this.images.findIndex(x => x.id == this.currentImage.id);
    // this.currentImage = this.images[this.index];
  }

  changeCurrentImage(image: AppFile){
    this.currentImage = image;
    this.currentImageChanged.emit(image);
  }

  nextImage(){
    if(this.index >= this.images.length - 1) return null;
    this.index++
    this.changeCurrentImage(this.images[this.index]);
  }

  previousImage(){
    if(this.index <= 0) return null
    this.index--;
    this.changeCurrentImage(this.images[this.index]);
  }

  finished = () => this.close.emit();

  openBottomSheet = () => this.bottomSheet.open(BottomSheetMenuComponent, { data: this.actions });
 
}
