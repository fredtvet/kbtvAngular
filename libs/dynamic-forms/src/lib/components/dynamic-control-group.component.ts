import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { DynamicHostDirective } from '../dynamic-host.directive';
import { ControlGroupComponent, DynamicControlGroup, DynamicForm } from '../interfaces';
import { ControlComponentLoaderComponent } from './control-component-loader.component';

@Component({
  selector: 'lib-dynamic-control-group',
  template: `
  <style>
    .question-container{
      flex-direction: row;
      box-sizing: border-box;
      display: flex;
      place-content: center flex-start;
      align-items: center;
    }
  </style>
  <mat-label *ngIf="controlGroup.label">{{ controlGroup.label }}</mat-label>
  <div class="question-container">   
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
}
