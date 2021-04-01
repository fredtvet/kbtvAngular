import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ViewChild } from '@angular/core';
import { DynamicHostDirective } from '../dynamic-host.directive';
import { ControlGroupComponent, DynamicControl, DynamicControlGroup, DynamicForm, QuestionComponent } from '../interfaces';
import { ControlComponentLoaderComponent } from './control-component-loader.component';

@Component({
  selector: 'lib-dynamic-control-group',
  template: `
  <mat-label *ngIf="controlGroup.label">{{ controlGroup.label }}</mat-label>
  <div 
    [fxLayout]="controlGroup.styling?.fxLayout || 'row'" 
    [fxLayoutAlign]="controlGroup.styling?.fxLayoutAlign || 'start center'" 
    >   
    <ng-container *dynamicHost>

    </ng-container>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicControlGroupComponent extends ControlComponentLoaderComponent implements ControlGroupComponent{
    @ViewChild(DynamicHostDirective, {static: true}) dynamicHost: DynamicHostDirective;
    
    controlGroup: DynamicControlGroup<{}>;
    formConfig: DynamicForm<{}, {}>;
    nestedNames: string[] = [];

    constructor(componentFactoryResolver: ComponentFactoryResolver, cdRef: ChangeDetectorRef) {
        super(componentFactoryResolver, cdRef, DynamicControlGroupComponent)
    }

    loadGroupComponents(){
      this.loadComponents(this.controlGroup.controls, this.formConfig, this.nestedNames);
    }

    protected onQuestionComponentInit(componentRef: ComponentRef<QuestionComponent>, control: DynamicControl<unknown>): void {
      componentRef.location.nativeElement.style.margin = this.controlGroup.styling?.itemMargin || "0 8px 0 0"
    }
}
