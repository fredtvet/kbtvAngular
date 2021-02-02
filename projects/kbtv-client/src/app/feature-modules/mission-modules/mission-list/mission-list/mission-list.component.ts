import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RolePermissions } from "@core/configurations/role-permissions.const";
import { Employer, Mission, MissionType } from "@core/models";
import { Roles } from "@core/roles.enum";
import { ChipsFactoryService } from '@core/services/ui/chips-factory.service';
import { ModelState } from "@core/state/model-state.interface";
import { _getSetPropCount } from '@shared-app/helpers/object/get-set-prop-count.helper';
import { AppButton } from "@shared-app/interfaces/app-button.interface";
import { AppChip } from '@shared-app/interfaces/app-chip.interface';
import { WithUnsubscribe } from "@shared-app/mixins/with-unsubscribe.mixin";
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { SearchBarConfig } from "@shared/components/search-bar/search-bar-config.interface";
import { MissionCriteriaForm, MissionCriteriaFormState } from '@shared/constants/forms/mission-criteria-form.const';
import { CreateMissionForm } from '@shared/constants/model-forms/save-mission-forms.const';
import { MissionCriteria } from "@shared/interfaces/mission-criteria.interface";
import { FormService } from 'form-sheet';
import { Immutable, ImmutableArray, Maybe, Prop } from "global-types";
import { ModelFormService } from 'model-form';
import { combineLatest, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { _getModelDisplayValue } from 'state-model';
import { MissionListFacade } from '../mission-list.facade';
import { MissionListProviders } from './mission-list-providers.const';

interface ViewModel{ 
  criteriaChips?: AppChip[], 
  bottomActions?: AppButton[], 
  missions: ImmutableArray<Mission>
}

@Component({
  selector: "app-mission-list",
  templateUrl: "./mission-list.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: MissionListProviders,
})
export class MissionListComponent extends WithUnsubscribe(){

  private partialVm$ = this.facade.criteria$.pipe(map(x => { return {
    criteriaChips: this.getCriteriaChips(x),
    bottomActions: this.getBottomActions(x)
  }}));

  topNavConfig: MainTopNavConfig = {title: "Oppdrag" };

  vm$: Observable<ViewModel> = combineLatest([
    this.partialVm$,
    this.facade.filteredMissions$
  ]).pipe(
    map(([partialVm, missions]) => { return <ViewModel>{...partialVm, missions} })
  );

  actionFab: AppButton;
  
  searchBar: SearchBarConfig; 

  searchBarBtns: AppButton[];

  searchBarHidden: boolean = true;

  constructor(
    private formService: FormService,
    private chipsFactory: ChipsFactoryService,
    private modelFormService: ModelFormService,
    private facade: MissionListFacade,
  ) {
    super();

    this.actionFab = {
      icon: "add", aria: "Legg til", color: "accent",
      callback: this.openMissionForm,
      allowedRoles: RolePermissions.MissionList.create
    };

    this.searchBar = {
      searchCallback: this.searchMissions,
      initialValue: this.facade.criteria?.searchString,
      placeholder: "Søk med adresse eller id",
    };

    this.searchBarBtns = [{aria: "Lukk", icon: "close", callback: this.toggleSearchBar}]
  }

  searchMissions = (searchString: string) => 
    this.facade.addCriteria({ ...this.facade.criteria, searchString });

  toggleSearchBar = () => this.searchBarHidden = !this.searchBarHidden;

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

  private getBottomActions(criteria: Maybe<Immutable<MissionCriteria>>): AppButton[] {
    return  [
        {icon: "filter_list",
          callback: this.openMissionFilter,
          color: _getSetPropCount(criteria || {}, {finished:false}) ? "accent" : undefined},
        {icon: "search", callback: this.toggleSearchBar}
    ]
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
