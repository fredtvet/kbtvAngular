import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';

@Component({
  selector: 'app-search-bar',
  template: `
  <input  placeholder="Søk" (keyup)="onSearch($event.target.value)" class="w-100 max-width" #searchBar>
  `
})

export class SearchBarComponent extends SubscriptionComponent{

  @Output() search = new EventEmitter();

  private searchUpdated: Subject<string> = new Subject();

  constructor() {
    super();
    this.searchUpdated.asObservable()
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(data => this.search.emit(data)), 
        takeUntil(this.unsubscribe)
      ).subscribe();
  }

  onSearch(input: string){
    this.searchUpdated.next(input)
  }
}
