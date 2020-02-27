import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { SubscriptionComponent } from 'src/app/subscription.component';

@Component({
  selector: 'app-search-bar',
  animations: [
    trigger('showHide', [
      state('show', style({
        top:'0px'
      })),
      state('hide', style({
        top:'-150px'
      })),
      transition('show => hide', [
        animate('.085s ease-out')
      ]),
      transition('hide => show', [
        animate('.085s ease-in',)
      ]),
    ])
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent extends SubscriptionComponent{

  @Input() inputPlaceholder: string = "Søk";
  @Input() isHidden: boolean = true;
  @Output() search = new EventEmitter();
  @Output() hide = new EventEmitter();

  private searchUpdated: Subject<string> = new Subject();

  constructor() {
    super();
    this.searchUpdated.asObservable()
      .pipe(
        takeUntil(this.unsubscribe),
        debounceTime(200),
        distinctUntilChanged())
      .subscribe(data => this.search.emit(data));// accept only relevant chars
  }

  onSearch(input: string){
    this.searchUpdated.next(input)
  }
}
