import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { skipWhile, take } from 'rxjs/operators';
import { AuthService } from '@core/services/auth';

@Directive({
  selector: '[ifRole]'
})
export class IfRoleDirective {

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
  ) {
  }

  @Input()
  set ifRole(roles: string[]) {
    if(!roles || roles.length == 0) 
      this.viewContainer.createEmbeddedView(this.templateRef);
    else 
      this.authService.currentUser$
      .pipe(skipWhile(user => !user?.role),take(1))
      .subscribe(user =>{
        if(user && roles.includes(user.role)) 
          this.viewContainer.createEmbeddedView(this.templateRef);
        else 
          this.viewContainer.clear();  
      });
  }


}
