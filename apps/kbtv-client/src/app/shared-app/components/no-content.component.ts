import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-content',
  template: `
    <style>mat-icon{ width:100%;font-size:50px; }</style>
    <div class="w-100 mt-6" style="text-align: center">
        <mat-icon class="mb-4" *ngIf="icon">{{ icon }}</mat-icon>
        <div class="mt-4"><ng-content></ng-content></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoContentComponent{
  @Input() icon: string;
}
