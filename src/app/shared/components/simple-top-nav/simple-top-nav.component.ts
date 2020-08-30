import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SimpleNavConfig } from '../../interfaces';
import { ButtonTypes } from 'src/app/shared-app/enums';

@Component({
  selector: 'app-simple-top-nav',
  templateUrl: './simple-top-nav.component.html',
  styleUrls: ['./simple-top-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTopNavComponent {
  ButtonTypes = ButtonTypes;
  
  @Input() config: SimpleNavConfig;

  constructor() { }

}
