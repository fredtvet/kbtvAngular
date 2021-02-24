import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { AppButton } from '@shared/components/app-button/app-button.interface';

@Component({
  selector: 'app-no-content',
  template: `
    <style>mat-icon{ width:100%;font-size:50px; }</style>
    <div class="text-center w-100 mt-6">
        <mat-icon class="mb-4" *ngIf="icon">{{ icon }}</mat-icon>
        <div class="mt-4"><ng-content></ng-content></div>
        <app-button *ngIf="button" [config]="button" class="fadeIn mt-4" style="display:block"></app-button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoContentComponent{
  @Input() icon: string;
  button: AppButton;

  @Input('buttonInfo') 
  set config(value: Pick<AppButton, "text" | "icon" | "callback" | "params">) {
    this.button = {
        ...value,
        type: ButtonTypes.Flat,
        color: 'accent',
    }
  } 

}
