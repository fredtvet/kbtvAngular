import { Component, OnInit, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { DocumentTypeService } from 'src/app/core/services';
import { DocumentType } from 'src/app/shared/models';

@Component({
  selector: 'app-document-type-form',
  templateUrl: './document-type-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentTypeFormComponent implements OnInit {
  
  @Output() finished = new EventEmitter();

  constructor(private DocumentTypeService: DocumentTypeService) { }

  ngOnInit() {
  }

  onSubmit = (documentType: DocumentType) => {
    if(!documentType) this.finished.emit();
    else this.DocumentTypeService.add$(documentType).subscribe(x => this.finished.emit(x));
  }
}
