import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-search-bar',
  animations: [
    trigger('showHide', [
      state('show', style({
        top:'0px'
      })),
      state('hide', style({
        top:'-72px'
      })),
      transition('show => hide', [
        animate('.1s ease-out')
      ]),
      transition('hide => show', [
        animate('.1s ease-in',)
      ]),
    ])
  ],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {

  @Input() inputPlaceholder: string = "Søk";
  @Output() searchString = new EventEmitter();

  private lastSearch: string = "";

  isHidden = true;

  public searchInput: string = "";

  constructor() { }

  ngOnInit() {
  }

  handleSearch(){
    if(this.lastSearch == this.searchInput) return false;
    this.lastSearch = this.searchInput;
    this.searchString.emit(this.searchInput);
  }

  toggleSearchBar(){
    this.isHidden = !this.isHidden;
  }
}
