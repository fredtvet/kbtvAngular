import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppButton } from '@shared-app/interfaces/app-button.interface';

@Component({
  selector: 'app-no-content',
  template: `
    <span class="text-center w-100">
        <p>{{ text }}</p>
        <app-button *ngIf="button" [config]="button" class="bounceIn"></app-button>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoContentComponent{
  @Input() text: string;
  @Input() button: AppButton;
}
