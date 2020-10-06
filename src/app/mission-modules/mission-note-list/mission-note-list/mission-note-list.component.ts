import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MissionNote } from 'src/app/core/models';
import { RolePresets } from 'src/app/shared-app/enums';
import { _sortByBool } from 'src/app/shared-app/helpers/array/sort-by-bool.helper';
import { AppButton } from 'src/app/shared-app/interfaces';
import { MainTopNavConfig } from 'src/app/shared/components/main-top-nav-bar/main-top-nav.config';
import { _trackByModel } from 'src/app/shared/trackby/track-by-model.helper';
import { MissionNoteListStore } from '../mission-note-list.store';

@Component({
  selector: 'app-mission-note-list',
  templateUrl: './mission-note-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionNoteListComponent {
  
  notes$: Observable<MissionNote[]> = this.store.getByMissionId$(this.missionId).pipe(
    map(x => _sortByBool<MissionNote>(x, "pinned", true))
  );

  navConfig: MainTopNavConfig; 
  fabs: AppButton[];
  
  get missionId() { return this.route.snapshot.paramMap.get('id'); }

  constructor( 
    private store: MissionNoteListStore,
    private route: ActivatedRoute,
    private router: Router,
    ) {  
    this.navConfig = {title:  "Notater", backFn: this.onBack};
    this.fabs = [
      {icon: "add", aria: 'Legg til', colorClass: 'bg-accent', 
      callback: this.openCreateNoteForm, allowedRoles: RolePresets.Internal}
    ]
  }
 
  openEditNoteForm = (entityId: number) => 
    this.router.navigate(
      ['skjema', {config: JSON.stringify({formConfig:{entityId, viewConfig:{lockedValues: {missionId: this.missionId}}}})}], 
      {relativeTo: this.route}
    );

  trackByNote = _trackByModel("missionNotes")
  
  private openCreateNoteForm = () => 
    this.router.navigate(
      ['skjema', {config: JSON.stringify({formConfig:{viewConfig:{lockedValues: {missionId: this.missionId}}}})}], 
      {relativeTo: this.route}
    );

  private onBack = () => this.router.navigate(['/oppdrag', this.missionId, 'detaljer']);

}
