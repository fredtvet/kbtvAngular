import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { SubscriptionComponent } from '../components/abstracts/subscription.component';
import { debounceTime, distinctUntilChanged, tap, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appInputListener]'
})
export class InputListenerDirective extends SubscriptionComponent{

  @Input() debounceTime: number = 200;
  @Output() inputChanged = new EventEmitter();

  private inputUpdated: Subject<string> = new Subject();

  constructor() {
    super();
    this.inputUpdated.asObservable()
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        tap(data => this.inputChanged.emit(data)), 
        takeUntil(this.unsubscribe)
      ).subscribe();
  }

  @HostListener("keyup", ["$event"]) onKeyUp(event: any) {
    this.onInputChange(event.target.value)
  }
  
  onInputChange(input: string){
    this.inputUpdated.next(input)
  }

}
