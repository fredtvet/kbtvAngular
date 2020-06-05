import { Injectable } from '@angular/core';
import { AppDocumentType } from 'src/app/shared/interfaces/models';
import { BaseSubject } from '../abstracts/base.subject';
import { LocalStorageService } from '../../local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class DocumentTypeSubject extends BaseSubject<AppDocumentType> {
  constructor(
    localStorageService: LocalStorageService
    ) { super(localStorageService, 'documentTypes'); }
}
