import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { AppDocumentType } from 'src/app/core/models';
import { DocumentTypeService, MissionDocumentService } from 'src/app/core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mission-document-form',
  template: `
  <app-mission-document-form-view
    [types]="documentTypes$ | async"
    (formSubmitted)="onSubmit($event)">
  </app-mission-document-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionDocumentFormComponent{
  @Input() missionId: number;
  @Output() finished = new EventEmitter();

  documentTypes$: Observable<AppDocumentType[]>;

  constructor(
    private missionDocumentService: MissionDocumentService,
    private documentTypeService: DocumentTypeService) {}

  ngOnInit() {
    this.documentTypes$ = this.documentTypeService.getAll$();
  }

  onSubmit(data:any){  
    if(!data || !this.missionId) this.finished.emit();
    else 
      this.missionDocumentService
        .addDocument$(this.missionId, data.documentType, data.files)
        .subscribe(x => this.finished.emit(x)) 
  }

}
