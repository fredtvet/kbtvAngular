import { Component, OnInit, Input, HostListener, EventEmitter, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-week-picker',
  templateUrl: './week-picker.component.html',
  styleUrls: ['./week-picker.component.scss']
})
export class WeekPickerComponent implements OnInit {

  @Input() totalWeeks: number;
  @Input() weekNr: number = 1;
  @Output() weekSelected = new EventEmitter();

  //Array containing weeks currently displaying
  visibleWeeks: number[];

  currentWeek = moment().week();

  private currentPage: number = 0;

  //Helpers for week picker
  private screenWidth: number;
  private weekItemWidth: number = 36;
  private chevronWidth: number = 40;
  private maxItems = 9; //Max items to accommodate for sidebar (lazy solution to prevent breaking ui)

  constructor() { this.setScreenWidth() }

  ngOnInit() {
    this.initWeekPicker();
  }

  ngOnChanges(changes: SimpleChanges): void{
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'totalWeeks': {
            this.initWeekPicker();
          }
          case 'weekNr': {
            this.initWeekPicker();
          }
        }
      }
    }
  }

  nextWeekPage(){
    if(this.setVisibleWeeks(this.currentPage + 1))
      this.currentPage++;
  }

  previousWeekPage(){
    if(this.setVisibleWeeks(this.currentPage - 1))
      this.currentPage--;
  }

  private initWeekPicker(){
    this.currentPage = this.getPageByWeek(this.weekNr);
    this.setVisibleWeeks(this.currentPage);
  }

  private setVisibleWeeks(page: number = 0): boolean{
    if(page < 0) return false;

    const availableSpace = this.screenWidth - (this.chevronWidth * 2);
    let weeksPerPage = Math.floor(availableSpace / this.weekItemWidth);
    if(weeksPerPage > this.maxItems) weeksPerPage = this.maxItems;
    const totalPages = Math.ceil(this.totalWeeks / weeksPerPage);

    if(page >= totalPages) return false;

    let weeks = [];
    let n = (weeksPerPage * page) + 1;
    let exp = (weeksPerPage * (page +1));

    if(exp > this.totalWeeks) exp = this.totalWeeks;

    for(; n <= exp; n++){
      weeks.push(n);
    }

    this.visibleWeeks = weeks;
    return true;
  }

  private getPageByWeek(week: number): number{
    const availableSpace = this.screenWidth - (this.chevronWidth * 2);
    let weeksPerPage = Math.floor(availableSpace / this.weekItemWidth);
    if(weeksPerPage > this.maxItems) weeksPerPage = this.maxItems;
    return Math.floor((week - 1) / weeksPerPage);
  }

  @HostListener('window:resize', ['$event'])
  setScreenWidth(event?) {
        this.screenWidth = window.innerWidth;
        this.initWeekPicker();
  }
}
