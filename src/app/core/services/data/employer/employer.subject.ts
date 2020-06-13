import { Injectable } from '@angular/core';
import { Employer } from 'src/app/core/models';
import { BaseSubject } from '../abstracts/base.subject';
import { LocalStorageService } from '../../local-storage.service';
import { ArrayHelperService } from '../../utility/array-helper.service';

@Injectable({
  providedIn: 'root'
})

export class EmployerSubject extends BaseSubject<Employer> {
  constructor(
    localStorageService: LocalStorageService,
    arrayHelperService: ArrayHelperService,
    ) { super(arrayHelperService,localStorageService, 'employers'); }
}
