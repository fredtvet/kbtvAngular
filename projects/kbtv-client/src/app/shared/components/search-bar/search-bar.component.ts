import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { SearchBarConfig } from './search-bar-config.interface';

@Component({
  selector: 'app-search-bar',
  template: `
    <div class="search-bar" *ngIf="cfg">
  
      <mat-icon>search</mat-icon>

      <input #searchInput appInputListener fxFlex   
          [placeholder]="cfg.placeholder" 
          [value]="cfg.initialValue || ''"
          (inputChanged)="handleSearchFn($event);">

      <ng-container *ngFor="let button of extraButtons || []">
        <mat-divider vertical=true></mat-divider>
        <app-button [config]="button | transformButton : ButtonTypes.Icon">
        </app-button>
      </ng-container>

    </div>
  `,
  styleUrls: ["./search-bar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent{
  ButtonTypes = ButtonTypes;

  @Input() cfg: SearchBarConfig;
  @Input() extraButtons: AppButton[];

  handleSearchFn = (criteria: string): void => 
    this.cfg?.searchCallback(criteria);
}
