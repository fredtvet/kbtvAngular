import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DetailTopNavConfig } from './detail-top-nav.config';

@Component({
  selector: 'app-detail-top-nav-bar',
  templateUrl: './detail-top-nav-bar.component.html',
  styleUrls: ['detail-top-nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[MatBottomSheet]
})
export class DetailTopNavBarComponent{
  @Input() config: DetailTopNavConfig;    
}
