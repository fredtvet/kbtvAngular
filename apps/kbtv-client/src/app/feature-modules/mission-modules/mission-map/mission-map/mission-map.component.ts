import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Mission } from '@core/models';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { AppChip } from '@shared-app/interfaces/app-chip.interface';
import { SearchBarConfig } from '@shared-mission/components/search-bar/search-bar-config.interface';
import { MissionCriteriaForm, MissionCriteriaFormSheet, MissionCriteriaFormState } from '@shared-mission/forms/mission-criteria-form.const';
import { _missionCriteriaChipsFactory } from '@shared-mission/mission-criteria-chips-factory.helper';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { BottomIconButtons } from '@shared/constants/bottom-icon-buttons.const';
import { MissionFilter } from '@shared/mission-filter.model';
import { _filter } from 'array-helpers';
import { FormService } from 'form-sheet';
import { Immutable } from 'global-types';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MissionListFacade } from '../../mission-list/mission-list.facade';

interface ViewModel {
  criteriaChips?: AppChip[];
  missions: Immutable<Mission>[];
}

@Component({
  selector: 'app-mission-map',
  templateUrl: './mission-map.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissionMapComponent {

  private partialVm$ = this.facade.criteria$.pipe(
    map((criteria) => {
      return {
        criteria,
        criteriaChips: _missionCriteriaChipsFactory(criteria, (x) =>
          this.facade.addCriteria(x)
        ),
      };
    })
  );

  vm$: Observable<ViewModel> = combineLatest([
    this.partialVm$,
    this.facade.missions$,
  ]).pipe(
    map(([vm, missions]) => {
      const filter = new MissionFilter(vm.criteria, undefined, true);
      return { ...vm, missions: _filter(missions, (entity) => filter.check(entity)) };
    })
  );

  actionFab: AppButton;

  searchBar: SearchBarConfig;

  searchBarBtns: AppButton[];

  navConfig: MainTopNavConfig;

  searchBarHidden: boolean = true;

  constructor(
    private formService: FormService,
    private facade: MissionListFacade
  ) {
    this.navConfig = {buttons: [
      { ...BottomIconButtons.Filter, callback: this.openMissionFilter },
      { ...BottomIconButtons.Search, callback: this.toggleSearchBar },
    ]};

    this.searchBar = {
      searchCallback: this.searchMissions,
      initialValue: this.facade.criteria?.searchString,
      placeholder: 'Søk med adresse eller id',
    };

    this.searchBarBtns = [
      { aria: 'Lukk', icon: 'close', callback: this.toggleSearchBar },
    ];
  }

  private searchMissions = (searchString: string) =>
    this.facade.addCriteria({ ...this.facade.criteria, searchString });

  private toggleSearchBar = () => (this.searchBarHidden = !this.searchBarHidden);

  private openMissionFilter = () =>
    this.formService.open<MissionCriteriaForm, MissionCriteriaFormState>(
      MissionCriteriaFormSheet,
      {
        initialValue: this.facade.criteria,
        formState: this.facade.criteriaFormState$,
      },
      (val) => this.facade.addCriteria(val)
    );
}
