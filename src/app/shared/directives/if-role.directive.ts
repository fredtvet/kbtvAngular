import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { skipWhile, take } from 'rxjs/operators';
import { IdentityService } from 'src/app/core/services/identity.service';

@Directive({
  selector: '[ifRole]'
})
export class IfRoleDirective {

  constructor(
    private element: ElementRef,
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
