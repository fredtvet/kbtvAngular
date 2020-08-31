import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-syncing-overlay',
  template: `
  <div style="position:relative">
    <ng-container *ngTemplateOutlet="template"></ng-container>
    <div class="spinner color-primary" style="position:absolute;z-index:5;width:100%;height:100%;background:#000;opacity:.5; top:0;left;0"></div>
  </div>
  `
})
export class SyncingOverlayComponent {
  @Input() template: TemplateRef<any>;
}