import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { AppButton } from '@shared/components/app-button/app-button.interface';

@Component({
  selector: 'app-no-content',
  template: `
    <div class="text-center w-100">
        <mat-icon *ngIf="icon" style="width:100%;margin-bottom:16px;font-size:50px;">{{ icon }}</mat-icon>
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
