import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from 'src/app/core';
import { Observable, Subscription } from 'rxjs';
import { SubscriptionComponent } from 'src/app/subscription.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html'
})
export class SubmitButtonComponent extends SubscriptionComponent {

  @Input() disabled: boolean;
  @Input() icon: string;

  loading$: Observable<boolean> = this.loadingService.loading$.pipe(takeUntil(this.unsubscribe));
  loading: boolean = false;

  constructor(private loadingService: LoadingService) {
    super();
    this.loading$.subscribe(x => this.loading =  x)
  }

}
