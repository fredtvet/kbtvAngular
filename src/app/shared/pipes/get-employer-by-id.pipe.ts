import { Pipe, PipeTransform } from '@angular/core';
import { EmployerService } from 'src/app/core/services';
import { Employer } from '../models';
import { SubscriptionComponent } from '../components/abstracts/subscription.component';
import { takeUntil } from 'rxjs/operators';

@Pipe({
  name: 'getEmployerById',
  pure: false
  
})
export class GetEmployerByIdPipe extends SubscriptionComponent implements PipeTransform {

  result: Employer = null;

  constructor(private employerService: EmployerService){super()}

  transform(value: number): Employer {   
    if(!value || value == null) return undefined;  
    
    this.employerService.get$(value).pipe(takeUntil(this.unsubscribe)).subscribe(x => this.result = x);
    return this.result;
  }

}
