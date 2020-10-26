import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { WithUnsubscribe } from '../mixins/with-unsubscribe.mixin';

@Directive({
  selector: '[appInputListener]'
})
export class InputListenerDirective extends WithUnsubscribe(){

  @Input() debounceTime: number = 400;
  @Output() inputChanged = new EventEmitter();

  private inputUpdated: Subject<string> = new Subject();

  constructor() {
    super();
    this.inputUpdated.asObservable()
      .pipe(
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        tap(data => this.inputChanged.emit(data)), 
        takeUntil(this.unsubscribe),
      ).subscribe();
  }

  @HostListener("keyup", ["$event"]) onKeyUp(event: any) {
    this.onInputChange(event.target.value)
  }
  
  onInputChange(input: string){
    this.inputUpdated.next(input)
  }

}
