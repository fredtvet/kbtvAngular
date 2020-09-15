import {
  Component,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
} from "@angular/core";
import { SelectableEntity } from 'src/app/shared/interfaces';
import { SelectableListPresenter, SelectableListBase } from 'src/app/shared/components';
import { ModelFile } from 'src/app/core/models';

@Component({
  providers: [SelectableListPresenter],
  selector: "app-image-list",
  templateUrl: "./image-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ImageListComponent extends SelectableListBase<ModelFile> {
  disableImageViewer: boolean = false; //Workaround to prevent ghost clicks on images

  @Input() totalRows: number = 2;
  @Output() imageClicked = new EventEmitter<ModelFile>();

  constructor(selectableListPresenter: SelectableListPresenter<ModelFile>) {
    super(selectableListPresenter);
  }

  toggleSelect(selectable: SelectableEntity<ModelFile>) {
    this.disableImageViewer = true;
    super.toggleSelect(selectable);
    setTimeout(() => (this.disableImageViewer = false), 500);
  }

  trackById(index: number, selectable: SelectableEntity<ModelFile>): string {
    return selectable.entity.id;
  }

  imageClick = (img: ModelFile) => {
    if (this.disableImageViewer || this.selectableListPresenter.isEntitySelected(img.id))
      return undefined;

    this.imageClicked.emit(img)
  }

}
