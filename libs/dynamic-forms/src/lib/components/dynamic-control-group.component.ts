import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Immutable } from 'global-types';
import { DynamicHostDirective } from '../dynamic-host.directive';
import { ControlGroupComponent, DynamicControlGroup } from '../interfaces';
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
    
    controlGroup: Immutable<DynamicControlGroup<any, any, any>>;
    nestedNames: string[] = [];

    constructor(componentFactoryResolver: ComponentFactoryResolver, cdRef: ChangeDetectorRef) {
        super(componentFactoryResolver, cdRef, DynamicControlGroupComponent)
    }

    loadGroupComponents(){
      this.loadComponents(this.controlGroup, this.nestedNames);
    }

    protected onConfigSet() { }
}
