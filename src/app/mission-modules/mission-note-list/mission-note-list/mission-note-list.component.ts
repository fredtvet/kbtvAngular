import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MissionNote } from 'src/app/core/models';
import { MainNavService, NotificationService } from 'src/app/core/services';
import { Notifications, RolePresets } from 'src/app/shared-app/enums';
import { TopDefaultNavConfig } from 'src/app/shared-app/interfaces';
import { ConfirmDialogComponent, ConfirmDialogConfig } from 'src/app/shared/components';
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
    private notificationService: NotificationService,
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    ) {  this.configureMainNav(this.missionId); }

  get missionId() {
    return +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    // this.notes$ =  this.store.getByMissionId$(this.missionId);
  }

  deleteNote = (id: number) => 
    this.store.delete$(id).subscribe(data =>
      this.notificationService.notify({
        title:'Vellykket! notat slettet.',        
        type: Notifications.Success
      })
    );
  
  openConfirmDeleteDialog = (id: number) => {   
    let config: ConfirmDialogConfig = {message: 'Slett notat?', confirmText: 'Slett'};
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: config});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteNote(id));
  }

  openEditNoteForm = (idPreset: number) => 
    this.router.navigate(['skjema'], {relativeTo: this.route, queryParams: {idPreset, missionId: this.missionId}});

  private openCreateNoteForm = () => 
    this.router.navigate(['skjema'], {relativeTo: this.route, queryParams: {missionId: this.missionId}});

  private configureMainNav(missionId: number){
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

  private onBack = (missionId: number) => this.router.navigate(['/oppdrag', missionId, 'detaljer']);
}
