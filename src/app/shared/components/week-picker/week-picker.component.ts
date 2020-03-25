import { Component, OnInit, Input, HostListener, EventEmitter, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { WeekPickerInfo } from '../../interfaces/week-picker-info.interface';

@Component({
  selector: 'app-week-picker',
  templateUrl: './week-picker.component.html',
  styleUrls: ['./week-picker.component.scss']
})
export class WeekPickerComponent {

  @Input() totalWeeks: number = 52;
  @Input() weekNr: number = 1;
  @Output() weekSelected = new EventEmitter();

  //Array containing weeks currently displaying
  weeks: number[] = [];
  currentWeek = moment().week();
  totalPages: number;

  private pickerInfoSubject = new BehaviorSubject<WeekPickerInfo>({ currentPage: 1, weeksPerPage: 6 });
  pickerInfo$ = this.pickerInfoSubject.asObservable();
  visibleWeeks$ = this.pickerInfo$.pipe(map(x => this.getCurrentWeeks()));

  //Helpers for week picker
  private screenWidth: number;
  private readonly weekItemWidth: number = 36; //Currently static, needs to correspond with scss
  private readonly chevronWidth: number = 40; //Currently static, needs to correspond with scss
  private readonly maxItems = 9; //Max items to accommodate for sidebar (lazy solution to prevent breaking ui)

  constructor() { }

  ngOnInit(): void {
    this.setScreenWidth();
    this.setWeeksArray();
    this.setCurrentPageByWeek();
  }

  ngOnChanges(changes: SimpleChanges): void{
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'totalWeeks':{
            if(!changes[propName].isFirstChange()){          
              this.updateWeeksArray();
              this.setTotalPages();
            }
          }
          case 'weekNr': {  
            if(!changes[propName].isFirstChange()){
              this.setCurrentPageByWeek();
            }
          }
        }
      }
    }
  }

  getCurrentWeeks(){
    const info = this.pickerInfoSubject.value;
    const startIndex = info.currentPage * info.weeksPerPage;
    return this.weeks.slice(startIndex, startIndex + info.weeksPerPage);
  }

  nextWeekPage():boolean{
    const info = this.pickerInfoSubject.value;
    const page = info.currentPage + 1;
    if(info.currentPage >= this.totalPages) return false;
    else info.currentPage = page;
    this.pickerInfoSubject.next(info);    
  }

  previousWeekPage():boolean{
    const info = this.pickerInfoSubject.value;
    const page = info.currentPage - 1;
    if(page < 0) return false;
    else info.currentPage = page;
    this.pickerInfoSubject.next(info);    
  }

  @HostListener('window:resize', ['$event'])
  setScreenWidth(event?) {
        const newWidth = window.innerWidth;
        if(newWidth !== this.screenWidth){
          this.screenWidth = window.innerWidth;
          this.setWeeksPerPage(this.screenWidth);
        }
  }

  private setCurrentPageByWeek(){
    const info = this.pickerInfoSubject.value;
    const currentPage = Math.floor((this.weekNr - 1) / info.weeksPerPage);
    if(info.currentPage !== currentPage){
      info.currentPage = currentPage;
      this.pickerInfoSubject.next(info);
    }   
  }

  private setWeeksPerPage(screenWidth: number){
      const info = this.pickerInfoSubject.value;
      const availableSpace = screenWidth - (this.chevronWidth * 2);

      info.weeksPerPage = Math.floor(availableSpace / this.weekItemWidth);
      if(info.weeksPerPage > this.maxItems) info.weeksPerPage = this.maxItems;

      this.pickerInfoSubject.next(info);
      this.setTotalPages();
  }
  
  private setTotalPages(){
    let info = this.pickerInfoSubject.value;
    this.totalPages = Math.ceil(this.totalWeeks / info.weeksPerPage) - 1;
    if(info.currentPage > this.totalPages){ 
      info.currentPage = this.totalPages;
      this.pickerInfoSubject.next(info);
    }
  }

  private setWeeksArray(){
    for(let n = 1; n <= this.totalWeeks; n++){
      this.weeks.push(n);
    }
  }

  private updateWeeksArray(){
    const length = this.weeks.length;
    if(this.totalWeeks > length) this.weeks.push(53);
    else if(this.totalWeeks < length) this.weeks.pop();
  }



}
