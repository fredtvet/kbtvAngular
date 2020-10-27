import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MissionNote } from 'src/app/core/models';
import { RolePresets } from 'src/app/shared-app/enums';
import { _sortByBool } from 'src/app/shared-app/helpers/array/sort-by-bool.helper';
import { _sortByDate } from 'src/app/shared-app/helpers/array/sort-by-date.helper';
import { _trackByModel } from 'src/app/shared-app/helpers/trackby/track-by-model.helper';
import { AppButton } from 'src/app/shared-app/interfaces';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { EditMissionNoteForm, CreateMissionNoteForm } from 'src/app/shared/constants/model-forms/save-mission-note-forms.const';
import { ModelFormService } from 'src/app/shared/model-form';
import { MissionNoteListStore } from '../mission-note-list.store';

@Component({
  selector: 'app-mission-note-list',
  templateUrl: './mission-note-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionNoteListComponent {
  
  notes$: Observable<MissionNote[]> = this.store.getByMissionId$(this.missionId).pipe(
    map(x => _sortByDate<MissionNote>(x, "updatedAt"))
  );

  navConfig: MainTopNavConfig; 
  fabs: AppButton[];
  
  get missionId() { return this.route.snapshot.paramMap.get('id'); }

  constructor( 
    private store: MissionNoteListStore,
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

  private onBack = () => this.router.navigate(['/oppdrag', this.missionId, 'detaljer']);

}
