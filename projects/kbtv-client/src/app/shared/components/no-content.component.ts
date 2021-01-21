import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { AppButton } from '@shared-app/interfaces/app-button.interface';

@Component({
  selector: 'app-no-content',
  template: `
    <span class="text-center w-100">
        <p>{{ text }}</p>
        <app-button *ngIf="button" [config]="button" class="bounceIn" style="display:block"></app-button>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoContentComponent{
  @Input() text: string;

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
