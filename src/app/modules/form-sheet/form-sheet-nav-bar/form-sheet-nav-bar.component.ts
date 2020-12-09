import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormSheetNavConfig } from '../interfaces';

@Component({
  selector: 'app-form-sheet-nav-bar',
  templateUrl: './form-sheet-nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSheetNavBarComponent {

  @Input() config: FormSheetNavConfig;
  @Output() closed = new EventEmitter<any>()

  constructor() {}

  handleCallback = (callback: Function) => callback()

}
