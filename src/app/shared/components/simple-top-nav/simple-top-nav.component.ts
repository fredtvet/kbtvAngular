import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ButtonTypes } from 'src/app/shared-app/enums';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SimpleNavConfig } from './simple-nav-config.interface';

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
