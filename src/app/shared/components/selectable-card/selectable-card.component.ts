import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-selectable-card',
  templateUrl: './selectable-card.component.html',
  styleUrls: ['./selectable-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SelectableCardComponent {

  @Input() selectedText: string;
  @Input() selectedIcon: string;
  @Input() isSelected: boolean = false;
  
  @Output() selected = new EventEmitter<boolean>()

  constructor() { }

  toggleSelection = () => {
    this.isSelected = !this.isSelected;
    this.selected.emit(this.isSelected);
  };
  
}
