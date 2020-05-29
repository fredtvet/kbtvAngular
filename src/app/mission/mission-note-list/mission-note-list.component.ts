import { Component} from '@angular/core';
import { MissionNote } from 'src/app/shared/models';
import { Observable } from 'rxjs';
import { MainNavService, NotificationService, MissionNoteService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { Roles, RolePresets } from 'src/app/shared/enums';
import { filter } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { MissionNoteFormSheetWrapperComponent } from '../components/mission-note-form/mission-note-form-sheet-wrapper.component';
import { TopDefaultNavConfig } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-mission-note-list',
  templateUrl: './mission-note-list.component.html',
})
export class MissionNoteListComponent {
  RolePresets = RolePresets;
  
  notes$: Observable<MissionNote[]>;
  
  constructor( 
    private bottomSheet: MatBottomSheet, 
    private missionNoteService: MissionNoteService,
    private notificationService: NotificationService,
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    ) { }

  get missionId() {
    return +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.configureMainNav(this.missionId)
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
    this.bottomSheet.open(MissionNoteFormSheetWrapperComponent, {data: {missionId: this.missionId}});

  openEditNoteForm = (noteIdPreset: number) => 
    this.bottomSheet.open(MissionNoteFormSheetWrapperComponent, {data: {noteIdPreset}});

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
