import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StartupService } from './core/services/startup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent {
  title = 'test-client';
  constructor(startupService: StartupService){ 
  }

}
