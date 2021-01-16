import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolePermissions } from '@core/configurations/role-permissions.const';
import { MissionNote } from '@core/models';
import { _trackByModel } from '@shared-app/helpers/trackby/track-by-model.helper';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { CreateMissionNoteForm, EditMissionNoteForm } from '@shared/constants/model-forms/save-mission-note-forms.const';
import { _sortByDate } from 'array-helpers';
import { Maybe } from 'global-types';
import { ModelFormService } from 'model-form';
import { map } from 'rxjs/operators';
import { SelectedMissionIdParam } from '../../mission-list/mission-list-route-params.const';
import { MissionNoteListFacade } from '../mission-note-list.facade';

@Component({
  selector: 'app-mission-note-list',
  templateUrl: './mission-note-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionNoteListComponent {
  
  notes$ = this.facade.getByMissionId$(this.missionId).pipe(
    map(x => _sortByDate<MissionNote>(x, "updatedAt"))
  );

  navConfig: MainTopNavConfig; 
  fabs: AppButton[];
  
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
    this.fabs = [
      {icon: "add", aria: 'Legg til', color: "accent", 
      callback: this.openCreateNoteForm, allowedRoles: RolePermissions.MissionNoteList.create}
    ]
  }
 
  openEditNoteForm = (entityId: number) => 
    this.modelFormService.open({formConfig: {
      dynamicForm: EditMissionNoteForm,
      stateProp: "missionNotes", entityId
    }});

  trackByNote = _trackByModel("missionNotes")
  
  private openCreateNoteForm = () => 
    this.modelFormService.open({
      formConfig: {
        dynamicForm: {...CreateMissionNoteForm, initialValue: {missionId: <string> this.missionId}},
        stateProp: "missionNotes",
      },
    });

  private onBack = () => this.router.navigate(['../'], {relativeTo: this.route.parent});
}
