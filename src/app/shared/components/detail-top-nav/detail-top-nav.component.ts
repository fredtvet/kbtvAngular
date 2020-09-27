import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { BaseTopNavComponent } from 'src/app/shared-app/components/base-top-nav.component';
import { ButtonTypes } from 'src/app/shared-app/enums';
import { DetailTopNavConfig } from './detail-top-nav-config.interface';

@Component({
  selector: 'app-detail-top-nav',
  templateUrl: './detail-top-nav.component.html',
  styleUrls: ['./detail-top-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailTopNavComponent extends BaseTopNavComponent<DetailTopNavConfig>{
  ButtonTypes = ButtonTypes;
  
  loading$: Observable<boolean> = this.loadingService.queryLoading$;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private loadingService: LoadingService) { 
      super(changeDetectorRef);
    }
  
  onMenuButtonClick = () => this.toggleDrawer.emit();
}
