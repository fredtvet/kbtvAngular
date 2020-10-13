import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Mission } from "src/app/core/models";
import { FilterSheetService } from 'src/app/core/services/filter/filter-sheet.service';
import { ModelFormService } from 'src/app/core/services/model/form/model-form.service';
import { ChipsFactoryService } from 'src/app/core/services/ui/chips-factory.service';
import { Roles } from "src/app/shared-app/enums";
import { _getSetPropCount } from 'src/app/shared-app/helpers/object/get-set-prop-count.helper';
import { AppButton } from 'src/app/shared-app/interfaces';
import { AppChip } from 'src/app/shared-app/interfaces/app-chip.interface';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { MissionFormViewComponent } from 'src/app/shared/components/mission-form-view/mission-form-view.component';
import { MissionCriteria } from "src/app/shared/interfaces/mission-filter-criteria.interface";
import { MissionFilterViewComponent } from "../mission-filter-view/mission-filter-view.component";
import { MissionListStore } from "../mission-list.store";

interface ViewModel{ missions: Mission[], chips?: AppChip[], fabs: AppButton[], navConfig?: MainTopNavConfig }

@Component({
  selector: "app-mission-list",
  templateUrl: "./mission-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissionListComponent {

  private navVm$: Observable<Partial<ViewModel>> = this.store.criteria$.pipe(map(x => { return {
    chips: this.getCriteriaChips(x),
    navConfig: this.getTopNavConfig(x)
  }}))

  vm$: Observable<ViewModel> = combineLatest([
    this.store.filteredMissions$,
    this.navVm$
  ]).pipe(
    map(([filtered, vm]) => { 
      return {...vm, fabs: this.fabs, missions: filtered.records} 
    }),
  );

  get initialMissionId() { return this.route.snapshot.paramMap.get('initialMissionId') }

  private fabs: AppButton[];

  constructor(
    private filterSheetService: FilterSheetService,
    private chipsFactory: ChipsFactoryService,
    private modelFormService: ModelFormService,
    private store: MissionListStore,
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
    this.modelFormService.open({formConfig: {
      viewComponent: MissionFormViewComponent,
      stateProp: "missions",
    }})
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
