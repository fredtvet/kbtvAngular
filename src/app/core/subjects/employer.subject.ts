import { Injectable } from '@angular/core';
import { Employer  } from 'src/app/shared/models';
import { BaseSubject } from './base.subject';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class EmployerSubject extends BaseSubject<Employer> {
  constructor(
    localStorageService: LocalStorageService
    ) { super(localStorageService, 'employers'); }
}
