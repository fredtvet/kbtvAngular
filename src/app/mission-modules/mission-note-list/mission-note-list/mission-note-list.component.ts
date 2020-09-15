import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MissionNote } from 'src/app/core/models';
import { MainNavService, TopDefaultNavConfig } from 'src/app/layout';
import { RolePresets } from 'src/app/shared-app/enums';
import { MissionNoteListStore } from '../mission-note-list.store';

@Component({
  selector: 'app-mission-note-list',
  templateUrl: './mission-note-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionNoteListComponent {
  
  notes$: Observable<MissionNote[]> = this.store.getByMissionId$(this.missionId);
  
  constructor( 
    private store: MissionNoteListStore,
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router,
    ) {  this.configureMainNav(this.missionId); }

  get missionId() {
    return this.route.snapshot.paramMap.get('id');
  }

  openEditNoteForm = (entityId: number) => 
    this.router.navigate(
      ['skjema', {config: JSON.stringify({formConfig:{entityId, viewConfig:{lockedValues: {missionId: this.missionId}}}})}], 
      {relativeTo: this.route}
    );

  private openCreateNoteForm = () => 
    this.router.navigate(
      ['skjema', {config: JSON.stringify({formConfig:{viewConfig:{lockedValues: {missionId: this.missionId}}}})}], 
      {relativeTo: this.route}
    );

  private configureMainNav(missionId: string){
    let cfg = {
      title:  "Notater",
      backFn: this.onBack, 
      backFnParams: [missionId]
    } as TopDefaultNavConfig;
    let fabs = [
      {icon: "add", aria: 'Legg til', colorClass: 'bg-accent', callback: this.openCreateNoteForm, allowedRoles: RolePresets.Internal}
    ];
    this.mainNavService.addConfig({default: cfg}, fabs);
  }

  private onBack = (missionId: string) => this.router.navigate(['/oppdrag', missionId, 'detaljer']);
}
