import { Pipe, PipeTransform, OnDestroy } from '@angular/core';
import { EmployerService } from 'src/app/core/services';
import { Employer } from '../../core/models/employer.interface';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'getEmployerById',
  pure: false 
})

export class GetEmployerByIdPipe implements OnDestroy, PipeTransform {

  result: Employer = null;
  private sub: Subscription;

  constructor(private employerService: EmployerService){}

  transform(value: number): Employer {   
    if(!value || value == null) return undefined;  
    
    this.sub = this.employerService.get$(value).subscribe(x => this.result = x);
    return this.result;
  }

  ngOnDestroy(){ 
    if(this.sub) this.sub.unsubscribe();
  }

}
