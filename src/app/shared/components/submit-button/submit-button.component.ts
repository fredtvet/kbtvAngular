import { Component, OnInit, Input } from '@angular/core';
import { LoadingService } from 'src/app/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html'
})
export class SubmitButtonComponent {

  @Input() disabled: boolean;
  @Input() icon: string;

  loading$: Subscription = new Subscription();
  loading: boolean;

  constructor(private loadingService: LoadingService) {
    this.loading$ = this.loadingService.loading$.subscribe(x => this.loading =  x)
  }

  ngOnDestroy(){
    this.loading$.unsubscribe();
  }

}
