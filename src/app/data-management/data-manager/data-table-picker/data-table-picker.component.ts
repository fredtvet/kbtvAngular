import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-data-table-picker',
  templateUrl: './data-table-picker.component.html',
  styleUrls: ['./data-table-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTablePickerComponent implements OnInit {
  
  @Input() tables: string[];
  @Input() selectedTable: string;
  @Output() tableSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  changeTable = (table:string) => this.tableSelected.emit(table);
}
