import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { AppDocumentType } from 'src/app/shared/interfaces/models';
import { DocumentTypeService, MissionDocumentService } from 'src/app/core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mission-document-form',
  templateUrl: './mission-document-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionDocumentFormComponent{
  @Input() missionId: number;
  @Output() finished = new EventEmitter();

  documentTypes$: Observable<AppDocumentType[]>;

  constructor(
    private missionDocumentService: MissionDocumentService,
    private DocumentTypeService: DocumentTypeService) {}

  ngOnInit() {
    this.documentTypes$ = this.DocumentTypeService.getAll$();
  }

  onSubmit(data:any){  
    if(!data || !this.missionId) this.finished.emit();
    else this.missionDocumentService.addDocument$(this.missionId, data.documentType, data.files).subscribe(x => this.finished.emit(x)) 
  }

}
