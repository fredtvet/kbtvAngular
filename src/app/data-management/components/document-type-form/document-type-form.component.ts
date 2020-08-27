import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AppDocumentType } from 'src/app/core/models';
import { DataManagementStore } from '../../data-management.store';
import { FormAction } from 'src/app/shared/enums';

@Component({
  selector: 'app-document-type-form',
  template: `
  <app-document-type-form-view
    (formSubmitted)="onSubmit($event)">
  </app-document-type-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentTypeFormComponent {
  
  @Output() finished = new EventEmitter();

  constructor(private store: DataManagementStore) { }

  onSubmit = (documentType: AppDocumentType) => {
    if(!documentType) this.finished.emit();
    else this.store.add$(documentType).subscribe(x => this.finished.emit(FormAction.Create));
  }
}
