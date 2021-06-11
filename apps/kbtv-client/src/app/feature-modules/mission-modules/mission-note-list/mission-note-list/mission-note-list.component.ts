import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolePermissions } from '@core/configurations/role-permissions.const';
import { ModelState } from '@core/state/model-state.interface';
import { _trackByModel } from '@shared-app/helpers/trackby/track-by-model.helper';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { CreateMissionNoteModelForm, EditMissionNoteModelForm } from '@shared-mission/forms/save-mission-note-model-form.const';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { Maybe } from 'global-types';
import { ModelFormService } from 'model/form';
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
    private modelFormService: ModelFormService<ModelState>
  ) {  
    this.navConfig = {title:  "Notater"};

    this.actionFab = {
      icon: "add", aria: 'Legg til', color: "accent", 
      callback: this.openCreateNoteForm, allowedRoles: RolePermissions.MissionNoteList.create
    }  
  }
 
  openEditNoteForm = (id: string) => 
    this.modelFormService.open(EditMissionNoteModelForm, {id});

  trackByNote = _trackByModel("missionNotes")
  
  private openCreateNoteForm = () => 
    this.modelFormService.open(CreateMissionNoteModelForm, {missionId: <string> this.missionId});

}
