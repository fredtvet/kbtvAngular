import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from '../../models/pagination.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() paginationInfo: Pagination;
  @Output() pageChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  nextPage(){
    let pageId = this.paginationInfo.actualPage + 1;

    if(pageId >= this.paginationInfo.totalPages) return false;

    this.pageChange.emit(pageId.toString());
  }

  previousPage(){
    let pageId = this.paginationInfo.actualPage - 1;

    if(pageId < 0) return false;

    this.pageChange.emit(pageId.toString());
  }

}
