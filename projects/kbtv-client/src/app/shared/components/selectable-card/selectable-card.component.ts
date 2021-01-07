import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CdkSelectableItemBaseComponent, CdkSelectablePresenter } from 'cdk-selectable';

@Component({
  selector: 'app-selectable-card',
  templateUrl: './selectable-card.component.html',
  styleUrls: ['./selectable-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectableCardComponent extends CdkSelectableItemBaseComponent {

  @Input() selectedText: string;
  @Input() selectedIcon: string;

  constructor(presenter: CdkSelectablePresenter) { super(presenter) }
}
