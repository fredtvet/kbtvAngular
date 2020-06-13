import { Component} from '@angular/core';
import { MissionNote } from 'src/app/core/models';
import { Observable } from 'rxjs';
import { MainNavService, NotificationService, MissionNoteService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RolePresets } from 'src/app/shared-app/enums';
import { filter } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { TopDefaultNavConfig } from 'src/app/shared-app/interfaces';

@Component({
  selector: 'app-mission-note-list',
  templateUrl: './mission-note-list.component.html',
})
export class MissionNoteListComponent {
  RolePresets = RolePresets;
  
  notes$: Observable<MissionNote[]>;
  
  constructor( 
    private missionNoteService: MissionNoteService,
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
    this.notes$ =  this.missionNoteService.getByMissionId$(this.missionId);
  }

  deleteNote = (id: number) => 
    this.missionNoteService.delete$(id).subscribe(data =>
      this.notificationService.setNotification(`Vellykket! notat slettet.`)
    );
  
  openConfirmDeleteDialog = (id: number) => {
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Bekreft at du ønsker å slette notatet.'});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteNote(id));
  }

  openCreateNoteForm = () => 
    this.router.navigate(['skjema'], {relativeTo: this.route, queryParams: {missionId: this.missionId}});

  openEditNoteForm = (idPreset: number) => 
    this.router.navigate(['skjema'], {relativeTo: this.route, queryParams: {idPreset, missionId: this.missionId}});

  private configureMainNav(missionId: number){
    let cfg = {
      title:  "Notater",
      backFn: this.onBack, 
      backFnParams: [missionId]
    } as TopDefaultNavConfig;
    
    this.mainNavService.addTopNavConfig({default: cfg});
  }

  private onBack = (missionId: number) => this.router.navigate(['/oppdrag', missionId, 'detaljer']);
}
