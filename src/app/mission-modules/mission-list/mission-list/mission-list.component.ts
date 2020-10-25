import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Employer, Mission, MissionType } from "src/app/core/models";
import { _getModelDisplayValue } from 'src/app/core/services/model/helpers/get-model-property.helper';
import { ChipsFactoryService } from 'src/app/core/services/ui/chips-factory.service';
import { Roles } from "src/app/shared-app/enums";
import { _getSetPropCount } from 'src/app/shared-app/helpers/object/get-set-prop-count.helper';
import { AppButton } from 'src/app/shared-app/interfaces';
import { AppChip } from 'src/app/shared-app/interfaces/app-chip.interface';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { MissionCriteriaFormState, MissionCriteriaForm } from 'src/app/shared/constants/forms/mission-criteria-form.const';
import { CreateMissionForm } from 'src/app/shared/constants/model-forms/save-mission-forms.const';
import { FormService } from 'src/app/shared/form';
import { MissionCriteria } from "src/app/shared/interfaces/mission-criteria.interface";
import { ModelFormService } from 'src/app/shared/model-form';
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
    private formService: FormService,
    private chipsFactory: ChipsFactoryService,
    private modelFormService: ModelFormService,
    private store: MissionListStore,
    private route: ActivatedRoute
  ) {
    this.fabs = [
      {icon: "add", aria: "Legg til", color: "accent",
        callback: this.openMissionForm,
        allowedRoles: [Roles.Leder, Roles.Mellomleder]}
    ];
  }

  searchMissions = (searchString: string) => {
    this.store.addFilterCriteria({ ...this.store.criteria, searchString });
  };

  private openMissionForm = () => 
    this.modelFormService.open({formConfig: {
      dynamicForm: CreateMissionForm,
      stateProp: "missions",
    }})

  private openMissionFilter = () => 
    this.formService.open<MissionCriteria, MissionCriteriaFormState>({
        formConfig: {...MissionCriteriaForm, initialValue: this.store.criteria}, 
        formState: this.store.criteriaFormState$,
        navConfig: {title: "Velg filtre"},
        submitCallback: (val: MissionCriteria) => this.store.addFilterCriteria(val),
      });   

  private getTopNavConfig(criteria: MissionCriteria): MainTopNavConfig {
    return {
      title: "Oppdrag",
      buttons: [
        {icon: "filter_list",
          callback: this.openMissionFilter,
          color: _getSetPropCount(criteria, {finished:false}) ? "accent" : null},
      ],
      searchBar: {
        callback: this.searchMissions,
        initialValue: criteria?.searchString,
        placeholder: "Søk med adresse eller id",
      },
    };
  }

  private getCriteriaChips(criteria: MissionCriteria){
    return this.chipsFactory.createCriteriaChips(criteria, 
      (prop) => this.resetCriteriaProp(prop, criteria),      
      {
        finished: {valueFormatter: (val: boolean) => val ? "Ferdig" : null},
        employer: {valueFormatter: (val: Employer) => _getModelDisplayValue("employers", val)},
        missionType: {valueFormatter: (val: MissionType) => _getModelDisplayValue("missionTypes", val)}
      },
    )
  }

  private resetCriteriaProp(prop: string, criteria: MissionCriteria){
    criteria[prop] = null;
    this.store.addFilterCriteria(criteria);
  }

}
