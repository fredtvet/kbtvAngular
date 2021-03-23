import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppButton } from '@shared/components/app-button/app-button.interface';

@Component({
  selector: 'app-no-content',
  template: `
    <style>mat-icon{ width:100%;font-size:50px; }</style>
    <div class="text-center w-100 mt-6">
        <mat-icon class="mb-4" *ngIf="icon">{{ icon }}</mat-icon>
        <div class="mt-4"><ng-content></ng-content></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoContentComponent{
  @Input() icon: string;
  button: AppButton;
}
