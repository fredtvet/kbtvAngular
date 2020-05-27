import {
  Component,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from "@angular/core";
import { MatDialog } from "@angular/material";
import { skip } from "rxjs/operators";
import { SelectableEntity, AppImage } from 'src/app/shared/interfaces';
import { SelectableListPresenter } from '../../components/selectable-list.presenter';

@Component({
  providers: [SelectableListPresenter],
  selector: "app-image-list",
  templateUrl: "./image-list.component.html",
  styleUrls: ["./image-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ImageListComponent {
  disableImageViewer: boolean = false; //Workaround to prevent ghost clicks on images

  @Input() totalRows: number = 2;

  @Input('images')
  set images(value: AppImage[]) {this.selectableListPresenter.addEntities(value)}

  @Output() selectionChanged = new EventEmitter<number[]>();
  @Output() imageClicked = new EventEmitter<AppImage>();

  selectableImages$ = this.selectableListPresenter.selectableEntities$;

  constructor(  
    private selectableListPresenter: SelectableListPresenter<AppImage>,
    private dialog: MatDialog) {}
  
  ngOnInit(): void {
      this.selectableListPresenter.selectedIds$.pipe(skip(1)).subscribe(x => this.selectionChanged.emit(x))
  }

  toggleSelect(selectable: SelectableEntity<AppImage>, isSelected: boolean) {
    this.disableImageViewer = true;
    this.selectableListPresenter.toggleEntity(selectable.entity.id)
    setTimeout(() => (this.disableImageViewer = false), 500);
  }

  trackById(index: number, selectable: SelectableEntity<AppImage>): number {
    return selectable.entity.id;
  }

  clearSelections = () => this.selectableListPresenter.addSelections([]);

  imageClick = (img: AppImage) => {
    if (this.disableImageViewer || this.selectableListPresenter.isEntitySelected(img.id))
      return undefined;

    this.imageClicked.emit(img)
  }

}
