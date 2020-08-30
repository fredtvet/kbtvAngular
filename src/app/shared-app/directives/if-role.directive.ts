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
    this.authStore.currentUser$
    .pipe(skipWhile(user => !user?.role),take(1))
    .subscribe(user =>{
      if(!roles || roles.length == 0 || roles.includes(user.role)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }


}
