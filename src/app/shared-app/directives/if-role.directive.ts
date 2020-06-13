import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { skipWhile, take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services';

@Directive({
  selector: '[ifRole]'
})

export class IfRoleDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
  }

  @Input()
  set ifRole(roles: string[]) {
    this.authService.currentUser$
    .pipe(skipWhile(user => !user.role),take(1))
    .subscribe(user =>{
      if(!roles || roles.length == 0 || roles.includes(user.role)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }


}
