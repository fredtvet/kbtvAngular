import { ApplicationModule, NgModule } from "@angular/core";
import { CdkSelectableContainerDirective } from "./cdk-selectable-container.directive";

@NgModule({
    declarations: [CdkSelectableContainerDirective],
    imports: [ApplicationModule],
    exports: [CdkSelectableContainerDirective]
})
export class CdkSelectableModule { }
  