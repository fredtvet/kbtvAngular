import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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

export class SearchBarComponent implements OnInit {

  @Input() inputPlaceholder: string = "Søk";
  @Input() isHidden: boolean = true;
  @Output() searchEvent = new EventEmitter();
  @Output() hide = new EventEmitter();

  private searchUpdated: Subject<string> = new Subject();

  constructor() {
    this.searchUpdated.asObservable()
      .pipe(debounceTime(200), distinctUntilChanged()).subscribe(data => this.searchEvent.emit(data));// accept only relevant chars
  }

  ngOnInit() {
  }

  onSearch(input: string){
    this.searchUpdated.next(input)
  }
}
