import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Maybe } from 'global-types';
import { FormSheetNavConfig } from '../interfaces';

@Component({
  selector: 'app-form-sheet-nav-bar',
  templateUrl: './form-sheet-nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSheetNavBarComponent {

  @Input() config: Maybe<FormSheetNavConfig>;
  @Output() closed = new EventEmitter<unknown>()

  constructor() {}

  handleCallback = (callback: Function) => callback()

}
