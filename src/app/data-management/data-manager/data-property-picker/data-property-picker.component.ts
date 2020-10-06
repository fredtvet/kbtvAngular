import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-data-property-picker',
  templateUrl: './data-property-picker.component.html',
  styleUrls: ['./data-property-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPropertyPickerComponent {
  
  @Input() properties: string[];
  @Input() selectedProperty: string;
  @Output() propertySelected = new EventEmitter<string>();

  constructor() { }

  changeProperty = (property:string) => this.propertySelected.emit(property);
}
