import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { skipWhile, take } from 'rxjs/operators';
import { IdentityService } from 'src/app/core/services';

@Directive({
  selector: '[ifRole]'
})

export class IfRoleDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private identityService: IdentityService
  ) {
  }

  @Input()
  set ifRole(roles: string[]) {
    this.identityService.currentUser$
    .pipe(skipWhile(user => !user.role),take(1))
    .subscribe(user =>{
      if(roles.includes(user.role)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }


}
