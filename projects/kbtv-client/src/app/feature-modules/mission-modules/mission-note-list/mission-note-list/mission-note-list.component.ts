import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolePermissions } from '@core/configurations/role-permissions.const';
import { MissionNote, MissionType } from '@core/models';
import { ModelState } from '@core/state/model-state.interface';
import { _trackByModel } from '@shared-app/helpers/trackby/track-by-model.helper';
import { AppButton } from '@shared/components/app-button/app-button.interface';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { CreateMissionNoteForm, EditMissionNoteForm } from '@shared/constants/model-forms/save-mission-note-forms.const';
import { Maybe } from 'global-types';
import { ModelFormService } from 'model-form';
import { SelectedMissionIdParam } from '../../mission-list/mission-list-route-params.const';
import { MissionNoteListFacade } from '../mission-note-list.facade';

@Component({
  selector: 'app-mission-note-list',
  templateUrl: './mission-note-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionNoteListComponent {
  can = RolePermissions.MissionNoteList
  
  notes$ = this.facade.getByMissionId$(this.missionId);

  navConfig: MainTopNavConfig; 
  actionFab: AppButton;
  
  get missionId(): Maybe<string> { 
    return this.route.parent?.parent?.snapshot.paramMap.get(SelectedMissionIdParam) 
  }

  constructor( 
    private facade: MissionNoteListFacade,
    private route: ActivatedRoute,
    private router: Router,
    private modelFormService: ModelFormService
    ) {  
    this.navConfig = {title:  "Notater", backFn: this.onBack};

    this.actionFab = {
      icon: "add", aria: 'Legg til', color: "accent", 
      callback: this.openCreateNoteForm, allowedRoles: RolePermissions.MissionNoteList.create
    }  
  }
 
  openEditNoteForm = (entityId: number) => 
    this.modelFormService.open<ModelState, MissionNote>({formConfig: {
      dynamicForm: EditMissionNoteForm,
      stateProp: "missionNotes", entityId
    }});

  trackByNote = _trackByModel("missionNotes")
  
  private openCreateNoteForm = () => 
    this.modelFormService.open<ModelState, MissionNote>({
      formConfig: {
        dynamicForm: {...CreateMissionNoteForm, initialValue: {missionId: <string> this.missionId}},
        stateProp: "missionNotes",
      },
    });

  private onBack = () => this.router.navigate(['../'], {relativeTo: this.route.parent});
}
