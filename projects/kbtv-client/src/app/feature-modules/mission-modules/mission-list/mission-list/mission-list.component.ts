import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Employer, Mission, MissionType } from "@core/models";
import { ChipsFactoryService } from '@core/services/ui/chips-factory.service';
import { ModelState } from "@core/state/model-state.interface";
import { FormService } from '@form-sheet/form-sheet.service';
import { Immutable, Maybe, Prop } from "global-types";
import { ModelFormService } from '@model-form/model-form.service';
import { _getModelDisplayValue } from '@model/helpers/get-model-property.helper';
import { Roles } from "@shared-app/enums";
import { _getSetPropCount } from '@shared-app/helpers/object/get-set-prop-count.helper';
import { AppButton } from '@shared-app/interfaces';
import { AppChip } from '@shared-app/interfaces/app-chip.interface';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { MissionCriteriaForm, MissionCriteriaFormState } from '@shared/constants/forms/mission-criteria-form.const';
import { CreateMissionForm } from '@shared/constants/model-forms/save-mission-forms.const';
import { SearchBarConfig } from "@shared/interfaces";
import { MissionCriteria } from "@shared/interfaces/mission-criteria.interface";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { MissionListFacade } from '../mission-list.facade';
import { MissionListProviders } from './mission-list-providers.const';

interface NavViewModel{ criteriaChips?: AppChip[], navConfig?: MainTopNavConfig }

@Component({
  selector: "app-mission-list",
  templateUrl: "./mission-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: MissionListProviders,
})
export class MissionListComponent {

  navVm$: Observable<NavViewModel> = this.facade.criteria$.pipe(map(x => { return {
    criteriaChips: this.getCriteriaChips(x),
    navConfig: this.getTopNavConfig(x)
  }}))

  missions$ = this.facade.filteredMissions$;

  fabs: AppButton[];

  private searchBar: SearchBarConfig;

  constructor(
    private formService: FormService,
    private chipsFactory: ChipsFactoryService,
    private modelFormService: ModelFormService,
    private facade: MissionListFacade,
  ) {
    this.fabs = [
      {icon: "add", aria: "Legg til", color: "accent",
        callback: this.openMissionForm,
        allowedRoles: [Roles.Leder, Roles.Mellomleder]}
    ];
    this.searchBar = {
      callback: this.searchMissions,
      initialValue: this.facade.criteria?.searchString,
      placeholder: "Søk med adresse eller id",
    };
  }

  searchMissions = (searchString: string) => 
    this.facade.addCriteria({ ...this.facade.criteria, searchString });

  private openMissionForm = () => 
    this.modelFormService.open<ModelState, Mission>({formConfig: {
      dynamicForm: CreateMissionForm,
      stateProp: "missions",
    }})

  private openMissionFilter = () => 
    this.formService.open<MissionCriteria, MissionCriteriaFormState>({
        formConfig: {...MissionCriteriaForm, initialValue: this.facade.criteria}, 
        formState: this.facade.criteriaFormState$,
        navConfig: {title: "Velg filtre"},
        submitCallback: (val: MissionCriteria) => this.facade.addCriteria(val),
      });   

  private getTopNavConfig(criteria: Maybe<Immutable<MissionCriteria>>): MainTopNavConfig {
    return {
      title: "Oppdrag",
      buttons: [
        {icon: "filter_list",
          callback: this.openMissionFilter,
          color: _getSetPropCount(criteria || {}, {finished:false}) ? "accent" : undefined},
      ],
      searchBar: this.searchBar
    };
  }

  private getCriteriaChips(criteria: Maybe<Immutable<MissionCriteria>>){
    return this.chipsFactory.createCriteriaChips(criteria, 
      (prop) => criteria ? this.resetCriteriaProp(prop, criteria) : null,      
      {
        finished: {valueFormatter: (val: boolean) => val ? "Ferdig" : null},
        employer: {valueFormatter: (val: Immutable<Employer>) => <string> _getModelDisplayValue("employers", val)},
        missionType: {valueFormatter: (val: Immutable<MissionType>) => <string> _getModelDisplayValue("missionTypes", val)}
      },
    )
  }

  private resetCriteriaProp(prop: Prop<Immutable<MissionCriteria>>, criteria: Immutable<MissionCriteria>){
    const clone = {...criteria};
    clone[prop] = undefined;
    this.facade.addCriteria(clone);
  }

}
