import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Roles, RolePresets, LayoutTopNavs } from '../../shared/enums';
import { Mission } from 'src/app/shared/models';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { NotificationService, MissionService, MissionImageService, MissionDocumentService, MissionNoteService, MainNavService} from 'src/app/core/services';
import { tap, filter, map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { MissionFormSheetWrapperComponent } from '../components/mission-form/mission-form-sheet-wrapper.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MissionNoteFormSheetWrapperComponent } from '../components/mission-note-form/mission-note-form-sheet-wrapper.component';
import { MissionDocumentFormSheetWrapperComponent } from '../components/mission-document-form/mission-document-form-sheet-wrapper.component';
import { MissionDetailsViewModel } from './mission-details-view-model.interface';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionDetailsComponent{
  RolePresets = RolePresets;
  Roles = Roles;

  vm$: Observable<MissionDetailsViewModel>;

  constructor(
    private mainNavService: MainNavService,
    private missionService: MissionService,
    private missionImageService: MissionImageService,
    private missionDocumentService: MissionDocumentService,
    private missionNoteService: MissionNoteService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog, 
    private _bottomSheet: MatBottomSheet,  
  ){ }

  ngOnInit(){
    let missionId = +this.route.snapshot.paramMap.get('id');

    let mission$ = this.missionService.getDetails$(missionId);
    let imageCount$ = this.missionImageService.getByMissionId$(missionId).pipe(map(x => x.length));
    let documentCount$ = this.missionDocumentService.getByMissionId$(missionId).pipe(map(x => x.length));
    let noteCount$ = this.missionNoteService.getByMissionId$(missionId).pipe(map(x => x.length));

    this.vm$ = combineLatest(mission$, imageCount$, documentCount$, noteCount$).pipe(
      map(([mission, imageCount, documentCount, noteCount]) => {
        return {mission, imageCount, documentCount, noteCount}
      }),
      tap(x => this.configureMainNav(x.mission))
    );
  }

  uploadImages = (data: {files: FileList, missionId: number}) => {
    this.missionImageService.addImages$(data.missionId, data.files).subscribe(data =>
      this.notificationService.setNotification(
        `Vellykket! ${data.length} ${data.length > 1 ? 'bilder' : 'bilde'} lastet opp.`
        )
    );
  }
  
  private deleteMission = (id: number) =>
    this.missionService.delete$(id).pipe(filter(del => del), tap(x => this.onBack()))
      .subscribe(del => this.notificationService.setNotification('Vellykket! Oppdrag slettet.'));
  
  private openMissionForm = (missionIdPreset: number) => 
    this._bottomSheet.open(MissionFormSheetWrapperComponent, {data: {missionIdPreset}});

  private openMissionNoteForm = (missionId: number) => 
    this._bottomSheet.open(MissionNoteFormSheetWrapperComponent, {data: {missionId}});
  
  private openDocumentForm = (missionId: number) => 
    this._bottomSheet.open(MissionDocumentFormSheetWrapperComponent, {data: {missionId}});

  private openDeleteMissionDialog = (id: number) => {
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Bekreft at du ønsker å slette oppdraget.'});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteMission(id));
  }

  private goToTimesheets = (mission: Mission) => 
    this.router.navigate(['timer/liste', {returnRoute: this.router.url, missionId: JSON.stringify(mission)}]);

  private configureMainNav(mission: Mission){
    let cfg = this.mainNavService.getDefaultConfig();
    
    cfg.backFn = this.onBack;  
    cfg.bottomSheetButtons = [
      {text: "Registrer timer", icon: "timer", callback: this.goToTimesheets, params:[mission], allowedRoles: RolePresets.Internal},
      {text: "Legg til dokument", icon: "note_add", callback: this.openDocumentForm, params: [mission.id], allowedRoles: [Roles.Leder]},
      {text: "Legg til notat", icon: "add_comment", callback: this.openMissionNoteForm, params: [mission.id], allowedRoles: RolePresets.Internal},
      {text: "Rediger", icon: "edit", callback: this.openMissionForm, params: [mission.id], allowedRoles: [Roles.Leder]},
      {text: "Slett", icon: "delete_forever", callback: this.openDeleteMissionDialog, params: [mission.id], allowedRoles: [Roles.Leder]}
    ];
    cfg.navType = LayoutTopNavs.Detail;
    cfg.multiLineTitle = mission.address.split(',').filter(x => x.toLowerCase().replace(/\s/g, '') !== 'norge'); 
    cfg.subTitle = mission.finished ? 'Oppdrag ferdig!' : '';
    cfg.subIcon = mission.finished ? 'check' : '';

    this.mainNavService.addConfig(cfg);
  }

  private onBack = () => this.router.navigate(['/oppdrag'])
  
}
