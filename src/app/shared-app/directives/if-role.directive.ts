import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { skipWhile, take } from 'rxjs/operators';
import { AuthStore } from 'src/app/core/services/auth';

@Directive({
  selector: '[ifRole]'
})
export class IfRoleDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authStore: AuthStore,
  ) {
  }

  @Input()
  set ifRole(roles: string[]) {   
    if(!roles || roles.length == 0 || roles.includes(this.authStore.currentUser.role)) 
      this.viewContainer.createEmbeddedView(this.templateRef);
    else 
      this.viewContainer.clear();
  }


}
