import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmitButtonComponent {

  @Input() disabled: boolean;
  @Input() icon: string;
  @Input() text: string = 'Lagre';

  loading$: Observable<boolean> = this.loadingService.loading$.pipe(shareReplay());

  constructor(private loadingService: LoadingService) {}
}
