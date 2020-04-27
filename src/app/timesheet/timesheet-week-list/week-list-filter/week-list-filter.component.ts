import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-week-list-filter',
  templateUrl: './week-list-filter.component.html'
})
export class WeekListFilterComponent implements OnInit {

  @Input() year: number;
  @Output() filterChanged = new EventEmitter();

  currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

  applyFilter = () => this.filterChanged.emit({year: this.year});
  
  close = () => this.filterChanged.emit();
  

}
