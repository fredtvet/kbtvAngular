import {
  Component,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from "@angular/core";
import { SelectableEntity, AppFile } from 'src/app/shared/interfaces';
import { SelectableListPresenter } from '../../components/selectable-list/selectable-list.presenter';
import { SelectableListBase } from '../../components/selectable-list/selectable-list.base';

@Component({
  providers: [SelectableListPresenter],
  selector: "app-image-list",
  templateUrl: "./image-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ImageListComponent extends SelectableListBase<AppFile> {
  disableImageViewer: boolean = false; //Workaround to prevent ghost clicks on images

  @Input() totalRows: number = 2;
  @Output() imageClicked = new EventEmitter<AppFile>();

  constructor(selectableListPresenter: SelectableListPresenter<AppFile>) {
    super(selectableListPresenter);
  }

  toggleSelect(selectable: SelectableEntity<AppFile>) {
    this.disableImageViewer = true;
    super.toggleSelect(selectable);
    setTimeout(() => (this.disableImageViewer = false), 500);
  }

  trackById(index: number, selectable: SelectableEntity<AppFile>): number {
    return selectable.entity.id;
  }

  imageClick = (img: AppFile) => {
    if (this.disableImageViewer || this.selectableListPresenter.isEntitySelected(img.id))
      return undefined;

    this.imageClicked.emit(img)
  }

}