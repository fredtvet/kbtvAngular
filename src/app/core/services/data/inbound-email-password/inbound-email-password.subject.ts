import { Injectable } from '@angular/core';
import { InboundEmailPassword } from 'src/app/core/models/inbound-email-password.interface';
import { BaseSubject } from '../abstracts/base.subject';
import { ArrayHelperService } from '../../utility/array-helper.service';

@Injectable({
  providedIn: 'root'
})
export class InboundEmailPasswordSubject extends BaseSubject<InboundEmailPassword> {

  constructor(
    arrayHelperService: ArrayHelperService
  ) { 
    super('id', arrayHelperService);
  } 

}
