import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppButton } from '@shared-app/interfaces/app-button.interface';

@Component({
  selector: 'app-home-nav-tile-grid',
  templateUrl: './home-nav-tile-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeNavTileGridComponent{
  @Input() navigations: AppButton[];
  @Input() columnCount: 2 | 3 = 2;
}