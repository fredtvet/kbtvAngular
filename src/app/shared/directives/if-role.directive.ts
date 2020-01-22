import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { IdentityService } from 'src/app/core';

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
    if(roles.includes(this.identityService.getCurrentUser().role)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }

  }


}
