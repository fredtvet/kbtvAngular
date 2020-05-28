import { Injectable } from '@angular/core';
import { DocumentType  } from 'src/app/shared/models';
import { BaseSubject } from '../abstracts/base.subject';
import { LocalStorageService } from '../../local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class DocumentTypeSubject extends BaseSubject<DocumentType> {
  constructor(
    localStorageService: LocalStorageService
    ) { super(localStorageService, 'documentTypes'); }
}
