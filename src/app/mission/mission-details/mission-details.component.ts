import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NavAction, ConfirmDeleteDialogComponent, ROLES, MissionNote, VertMenuParentExtension, Mission, MissionReport, MissionImage, NOTIFICATIONS } from 'src/app/shared';
import { NotificationService, MissionService, MissionImageService, MissionReportService, MissionNoteService, LoadingService } from 'src/app/core';
import { MissionReportFormComponent } from '../components/mission-report-form/mission-report-form.component';
import { take, map, tap } from 'rxjs/operators';
import { MainNavConfig } from 'src/app/shared/layout/main-nav/main-nav-config.model';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html'
})

export class MissionDetailsComponent extends VertMenuParentExtension{
  ROLES = ROLES;

  mainNavConfig = new MainNavConfig();

  mission: Mission = new Mission();
  mission$: Observable<Mission>;
  images$: Observable<MissionImage[]>;
  notes$: Observable<MissionNote[]>;
  reports$: Observable<MissionReport[]>;
  loading$: Observable<boolean>;

  constructor(
    private missionService: MissionService,
    private missionImageService: MissionImageService,
    private missionReportService: MissionReportService,
    private missionNoteService: MissionNoteService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) {super();}

  ngOnInit(){

    this.mission.id = +this.route.snapshot.paramMap.get('id');

    this.mission$ = this.missionService.get$(this.mission.id);
    this.images$ = this.missionImageService.getByMissionId$(this.mission.id);
    this.reports$ = this.missionReportService.getByMissionId$(this.mission.id).pipe(tap(console.log));
    this.notes$ = this.missionNoteService.getByMissionId$(this.mission.id)

    this.configureMainNav()
    this.mission$.subscribe(x => {
      this.mission = x;
      this.addMissionToMainNav(x)
    });
  }

  uploadImages(files: FileList)
  {
    this.missionImageService.addImages$(this.mission.id, files).pipe(take(1))
      .subscribe(data => this.notificationService.setNotification(`Vellykket! ${data.length} ${data.length > 1 ? 'bilder' : 'bilde'} lastet opp.`));
  }

  deleteImage(id:number){
    this.missionImageService.delete$(id).pipe(take(1))
      .subscribe(res =>  this.notificationService.setNotification('Vellykket! Bilde slettet'));
  }


  deleteNote(id: number){
    this.missionNoteService.delete$(id)
      .subscribe(res => this.notificationService.setNotification('Vellykket! Notat slettet.'));
  }

  deleteReport(id: number){
    this.missionReportService.delete$(id)
      .subscribe(res => this.notificationService.setNotification('Vellykket! Rapport slettet.'));
  }

  createReport(data){
    if(!data) return null;
    this.missionReportService.addReport$(this.mission.id, data.reportType, data.files)
      .subscribe(res => this.notificationService.setNotification('Vellykket! Rapport lastet opp'));
  }

  editNote(note: MissionNote){
    this.router.navigate(['oppdrag', note.missionId, 'notater', note.id, 'rediger'])
  }

  private deleteMission(){
    this.missionService.delete$(this.mission.id).subscribe(
      deleted => {
        if(deleted){
          this.onBack();
          this.notificationService.setNotification('Vellykket! Oppdrag slettet.')
        }
      }
    );
  }

  private editMission = (e: string) => {
    this.router.navigate(['oppdrag', this.mission.id, 'rediger'])
  }

  private createNote = (e: string) => {
    this.router.navigate(['oppdrag', this.mission.id, 'notater','ny'])
  }

  private  openCreateReportDialog = (e: string) => {
    const createDialogRef = this.dialog.open(MissionReportFormComponent);
    createDialogRef.afterClosed().subscribe(data => this.createReport(data));
  }

  private openMissionDeleteDialog = (e: string) => {
    const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
    deleteDialogRef.afterClosed().subscribe(confirmed => {if(confirmed)this.deleteMission()});
  }

  configureMainNav(){
    this.vertActions = [
      new NavAction("Legg til rapport", "note_add","createReport", this.openCreateReportDialog, [ROLES.Leder]),
      new NavAction("Legg til notat", "add_comment","createNote", this.createNote),
      new NavAction("Rediger", "edit","edit", this.editMission, [ROLES.Leder]),
      new NavAction("Slett", "delete_forever", "delete", this.openMissionDeleteDialog, [ROLES.Leder])
    ];
    this.mainNavConfig.vertActions = this.vertActions;
    this.mainNavConfig.altNav = true;
  }

  addMissionToMainNav(mission: Mission){
    if(mission == undefined) return null;
    if(mission.address !== null){
      this.mainNavConfig.title = mission.address.replace(", Norge","").replace(/,/g, ";");
    }
    this.mainNavConfig.subTitle = mission.finished ? 'Oppdrag ferdig!' : '';
    this.mainNavConfig.subIcon = mission.finished ? 'check' : '';
  }

  onBack(){
    this.router.navigate(['/oppdrag'])
  }

}
