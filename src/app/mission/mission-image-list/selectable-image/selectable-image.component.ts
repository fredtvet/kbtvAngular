import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageWithSelect, AppImage } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-selectable-image',
  templateUrl: './selectable-image.component.html',
  styleUrls: ['./selectable-image.component.scss']
})
export class SelectableImageComponent implements OnInit {

  @Input() imageWithSelect: ImageWithSelect<AppImage>;
  @Output() imageSelected = new EventEmitter<ImageWithSelect<AppImage>>()

  constructor() { }

  ngOnInit() {
  }

  selectOrRemoveImage(imageWithSelect: ImageWithSelect<AppImage>){
    this.imageSelected.emit(imageWithSelect);
  }

}
