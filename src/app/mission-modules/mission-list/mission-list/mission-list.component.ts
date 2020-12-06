import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatest, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { Employer, Mission, MissionType } from "src/app/core/models";
import { ChipsFactoryService } from 'src/app/core/services/ui/chips-factory.service';
import { _getModelDisplayValue } from 'src/app/model/helpers/get-model-property.helper';
import { Roles } from "src/app/shared-app/enums";
import { _getSetPropCount } from 'src/app/shared-app/helpers/object/get-set-prop-count.helper';
import { AppButton } from 'src/app/shared-app/interfaces';
import { AppChip } from 'src/app/shared-app/interfaces/app-chip.interface';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { MissionCriteriaForm, MissionCriteriaFormState } from 'src/app/shared/constants/forms/mission-criteria-form.const';
import { CreateMissionForm } from 'src/app/shared/constants/model-forms/save-mission-forms.const';
import { FormService } from 'src/app/shared/form';
import { MissionCriteria } from "src/app/shared/interfaces/mission-criteria.interface";
import { ModelFormService } from 'src/app/shared/model-form';
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

  missions$: Observable<Mission[]> = this.facade.filteredMissions$;

  get initialMissionId() { return this.route.snapshot.paramMap.get('initialMissionId') }

  fabs: AppButton[];

  constructor(
    private formService: FormService,
    private chipsFactory: ChipsFactoryService,
    private modelFormService: ModelFormService,
    private facade: MissionListFacade,
    private route: ActivatedRoute
  ) {
    this.fabs = [
      {icon: "add", aria: "Legg til", color: "accent",
        callback: this.openMissionForm,
        allowedRoles: [Roles.Leder, Roles.Mellomleder]}
    ];
  }

  searchMissions = (searchString: string) => 
    this.facade.addCriteria({ ...this.facade.criteria, searchString });

  private openMissionForm = () => 
    this.modelFormService.open({formConfig: {
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
    this.facade.addCriteria(criteria);
  }

}
