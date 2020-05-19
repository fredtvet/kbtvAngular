import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Roles, RolePresets } from '../../shared/enums';
import { MissionNote, Mission, MissionReport, MissionImage } from 'src/app/shared/models';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { NotificationService, MissionService, MissionImageService, MissionReportService, MissionNoteService, MainNavService} from 'src/app/core/services';
import { tap, filter, map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { MissionFormSheetWrapperComponent } from '../components/mission-form/mission-form-sheet-wrapper.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MissionNoteFormSheetWrapperComponent } from '../components/mission-note-form/mission-note-form-sheet-wrapper.component';
import { MissionReportFormSheetWrapperComponent } from '../components/mission-report-form/mission-report-form-sheet-wrapper.component';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MissionDetailsComponent{
  RolePresets = RolePresets;
  Roles = Roles;

  vm$: Observable<{mission: Mission, images:MissionImage[], notes:MissionNote[], reports:MissionReport[]}>;

  mission$: Observable<Mission>;
  images$: Observable<MissionImage[]>;
  notes$: Observable<MissionNote[]>;
  reports$: Observable<MissionReport[]>;

  constructor(
    private mainNavService: MainNavService,
    private missionService: MissionService,
    private missionImageService: MissionImageService,
    private missionReportService: MissionReportService,
    private missionNoteService: MissionNoteService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog, 
    private _bottomSheet: MatBottomSheet,  
  ){ 
    this.configureMainNav(+this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(){
    let missionId = +this.route.snapshot.paramMap.get('id');

    let mission$ = this.missionService.getDetails$(missionId);
    let images$ = this.missionImageService.getByMissionId$(missionId);
    let reports$ = this.missionReportService.getByMissionId$(missionId);
    let notes$ = this.missionNoteService.getByMissionId$(missionId);

    this.vm$ = combineLatest(mission$, images$, reports$, notes$).pipe(
      map(([mission, images, reports, notes]) => {
        return {mission, images, reports, notes}
      }),
      tap(x => this.updateMainNavWithMission(x.mission))
    );
  }

  uploadImages = (data: {files: FileList, missionId: number}) => {
    this.missionImageService.addImages$(data.missionId, data.files).subscribe(data =>
      this.notificationService.setNotification(
        `Vellykket! ${data.length} ${data.length > 1 ? 'bilder' : 'bilde'} lastet opp.`
        )
    );
  }
  
  deleteImage = (id:number) => 
    this.missionImageService.delete$(id).subscribe(res =>  
      this.notificationService.setNotification('Vellykket! Bilde slettet'));
  
  deleteNote = (id: number) =>
    this.missionNoteService.delete$(id).subscribe(res => 
      this.notificationService.setNotification('Vellykket! Notat slettet.'));
  
  deleteReport = (id: number) => 
    this.missionReportService.delete$(id).subscribe(res => 
      this.notificationService.setNotification('Vellykket! Rapport slettet.'));
  
  private deleteMission = (id: number) =>
    this.missionService.delete$(id).pipe(filter(del => del), tap(x => this.onBack()))
      .subscribe(del => this.notificationService.setNotification('Vellykket! Oppdrag slettet.'));
  
  private openMissionForm = (missionIdPreset: number) => 
    this._bottomSheet.open(MissionFormSheetWrapperComponent, {data: {missionIdPreset}});

  private openMissionNoteForm = (missionId: number) => 
    this._bottomSheet.open(MissionNoteFormSheetWrapperComponent, {data: {missionId}});
  
  private openReportForm = (missionId: number) => 
    this._bottomSheet.open(MissionReportFormSheetWrapperComponent, {data: {missionId}});

  private openDeleteMissionDialog = (id: number) => {
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Bekreft at du ønsker å slette oppdraget.'});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteMission(id));
  }

  private goToTimesheets = (mission: Mission) => 
    this.router.navigate(['timer/liste', {returnRoute: this.router.url, missionId: JSON.stringify(mission)}]);

  private configureMainNav(missionId: number){
    let cfg = this.mainNavService.getDefaultConfig();
    
    cfg.backFn = this.onBack;  
    cfg.bottomSheetButtons = [
      {text: "Legg til rapport", icon: "note_add", callback: this.openReportForm, params: [missionId], allowedRoles: [Roles.Leder]},
      {text: "Legg til notat", icon: "add_comment", callback: this.openMissionNoteForm, params: [missionId], allowedRoles: RolePresets.Internal},
      {text: "Rediger", icon: "edit", callback: this.openMissionForm, params: [missionId], allowedRoles: [Roles.Leder]},
      {text: "Slett", icon: "delete_forever", callback: this.openDeleteMissionDialog, params: [missionId], allowedRoles: [Roles.Leder]},
    ];
    this.mainNavService.addConfig(cfg);
  }

  private updateMainNavWithMission = (mission: Mission) => {
    if(mission == undefined) return null;
    let cfg = this.mainNavService.getCurrentConfig(); 
    cfg.bottomSheetButtons = cfg.bottomSheetButtons.filter(x => x.icon != "timer"); //remove if btn alrdy exist
    
    cfg.bottomSheetButtons.push(
      {text: "Registrer timer", icon: "timer", callback: this.goToTimesheets, params:[mission], allowedRoles: RolePresets.Internal})

    cfg.multiLineTitle = mission.address.split(',').filter(x => x.toLowerCase().replace(/\s/g, '') !== 'norge'); 
    cfg.subTitle = mission.finished ? 'Oppdrag ferdig!' : '';
    cfg.subIcon = mission.finished ? 'check' : '';
    this.mainNavService.addConfig(cfg);
  }

  private onBack = () => this.router.navigate(['/oppdrag'])
  
}
