import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Mission } from "src/app/core/models";
import { FilterSheetService } from 'src/app/core/services/filter/filter-sheet.service';
import { ChipsFactoryService } from 'src/app/core/services/ui/chips-factory.service';
import { Roles } from "src/app/shared-app/enums";
import { _getSetPropCount } from 'src/app/shared-app/helpers/object/get-set-prop-count.helper';
import { AppButton } from 'src/app/shared-app/interfaces';
import { MainTopNavConfig } from "src/app/shared/components/main-top-nav/main-top-nav-config.interface";
import { MissionCriteria } from "src/app/shared/interfaces/mission-filter-criteria.interface";
import { ViewModel } from 'src/app/shared/interfaces/view-model.interface';
import { MissionFilterViewComponent } from "../mission-filter-view/mission-filter-view.component";
import { MissionListStore } from "../mission-list.store";

@Component({
  selector: "app-mission-list",
  templateUrl: "./mission-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissionListComponent {
  Roles = Roles;

  private navVm$: Observable<ViewModel<any>> = this.store.criteria$.pipe(map(x => { return {
    chipRows: [{id: 1, arr: this.getCriteriaChips(x)}],
    navConfig: this.getTopNavConfig(x)
  }}))

  vm$: Observable<ViewModel<Mission[]>> = combineLatest([
    this.store.filteredMissions$,
    this.navVm$
  ]).pipe(map(([filtered, vm]) => { return {...vm, fabs: this.fabs, content: filtered.records} }));

  private fabs: AppButton[];

  constructor(
    private filterSheetService: FilterSheetService,
    private chipsFactory: ChipsFactoryService,
    private store: MissionListStore,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.fabs = [
      {icon: "add", aria: "Legg til", colorClass: "bg-accent",
        callback: this.openMissionForm,
        allowedRoles: [Roles.Leder, Roles.Mellomleder]}
    ];
  }

  searchMissions = (searchString: string) => {
    this.store.addFilterCriteria({ ...this.store.criteria, searchString });
  };

  private openMissionForm = () => {
    this.router.navigate(["ny"], { relativeTo: this.route });
  };

  private openMissionFilter = () => {
    this.filterSheetService.open({
      formConfig: { viewComponent: MissionFilterViewComponent },
    });
  };

  private getTopNavConfig(criteria: MissionCriteria): MainTopNavConfig {
    return {
      title: "Oppdrag",
      buttons: [
        {icon: "filter_list",
          callback: this.openMissionFilter,
          colorClass: _getSetPropCount(criteria, {finished:false}) ? "color-accent" : ""},
      ],
      searchBar: {
        callback: this.searchMissions,
        initialValue: criteria?.searchString,
        placeholder: "Søk med adresse eller id",
      },
    };
  }

  private getCriteriaChips(criteria: MissionCriteria){
    return this.chipsFactory.createFilterChips(
      this.formatCriteriaChips(criteria), 
      (prop) => this.resetCriteriaProp(prop, criteria)
    )
  }

  private resetCriteriaProp(prop: string, criteria: MissionCriteria){
    criteria[prop] = null;
    this.store.addFilterCriteria(criteria);
  }

  private formatCriteriaChips(criteria: MissionCriteria): MissionCriteria{
    return {...criteria, finished: criteria.finished ? "Ferdig" : null as any};
  }
}
