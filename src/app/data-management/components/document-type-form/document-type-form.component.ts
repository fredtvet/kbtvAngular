import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { DocumentTypeService } from 'src/app/core/services';
import { AppDocumentType } from 'src/app/core/models';

@Component({
  selector: 'app-document-type-form',
  template: `
  <app-document-type-form-view
    (formSubmitted)="onSubmit($event)">
  </app-document-type-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentTypeFormComponent implements OnInit {
  
  @Output() finished = new EventEmitter();

  constructor(private DocumentTypeService: DocumentTypeService) { }

  ngOnInit() {
  }

  onSubmit = (documentType: AppDocumentType) => {
    if(!documentType) this.finished.emit();
    else this.DocumentTypeService.add$(documentType).subscribe(x => this.finished.emit(x));
  }
}
