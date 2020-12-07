import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MissionNote } from '@core/models';
import { RolePresets } from '@shared-app/enums';
import { _sortByDate } from '@shared-app/helpers/array/sort-by-date.helper';
import { _trackByModel } from '@shared-app/helpers/trackby/track-by-model.helper';
import { AppButton } from '@shared-app/interfaces';
import { MainTopNavConfig } from '@shared/components/main-top-nav-bar/main-top-nav.config';
import { CreateMissionNoteForm, EditMissionNoteForm } from '@shared/constants/model-forms/save-mission-note-forms.const';
import { ModelFormService } from '@shared/model-form';
import { MissionNoteListFacade } from '../mission-note-list.facade';

@Component({
  selector: 'app-mission-note-list',
  templateUrl: './mission-note-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionNoteListComponent {
  
  notes$: Observable<MissionNote[]> = this.facade.getByMissionId$(this.missionId).pipe(
    map(x => _sortByDate<MissionNote>(x, "updatedAt"))
  );

  navConfig: MainTopNavConfig; 
  fabs: AppButton[];
  
  get missionId() { return this.route.parent.parent.snapshot.params.id }

  constructor( 
    private facade: MissionNoteListFacade,
    private route: ActivatedRoute,
    private router: Router,
    private modelFormService: ModelFormService
    ) {  
    this.navConfig = {title:  "Notater", backFn: this.onBack};
    this.fabs = [
      {icon: "add", aria: 'Legg til', color: "accent", 
      callback: this.openCreateNoteForm, allowedRoles: RolePresets.Internal}
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
        dynamicForm: {...CreateMissionNoteForm, initialValue: {missionId: this.missionId}},
        stateProp: "missionNotes",
      },
    });

  private onBack = () => this.router.navigate(['../'], {relativeTo: this.route.parent});
}
