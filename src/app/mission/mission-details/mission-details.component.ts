import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from '../../shared/enums';
import { MissionNote, Mission, MissionReport, MissionImage } from 'src/app/shared/models';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { NotificationService, MissionService, MissionImageService, MissionReportService, MissionNoteService, MainNavService} from 'src/app/core/services';
import { MissionReportFormComponent } from '../components/mission-report-form/mission-report-form.component';
import { take, takeUntil, tap, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html'
})

export class MissionDetailsComponent extends SubscriptionComponent{
  Roles = Roles;

  mission: Mission = new Mission();
  mission$: Observable<Mission>;

  images$: Observable<MissionImage[]>;
  notes$: Observable<MissionNote[]>;
  reports$: Observable<MissionReport[]>;

  loading$: Observable<boolean>;

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
  ){ 
    super();
    this.configureMainNav();
  }

  ngOnInit(){
    this.mission.id = +this.route.snapshot.paramMap.get('id');

    this.mission$ = this.missionService.getDetails$(this.mission.id);
    this.images$ = this.missionImageService.getByMissionId$(this.mission.id);
    this.reports$ = this.missionReportService.getByMissionId$(this.mission.id);
    this.notes$ = this.missionNoteService.getByMissionId$(this.mission.id);
        
    this.mission$.pipe(takeUntil(this.unsubscribe)).subscribe(x => {
      this.mission = x;
      this.updateMainNavWithMission(x)
    });
  }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.

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
    this.missionNoteService.delete$(id).pipe(take(1))
      .subscribe(res => this.notificationService.setNotification('Vellykket! Notat slettet.'));
  }

  deleteReport(id: number){
    this.missionReportService.delete$(id).pipe(take(1))
      .subscribe(res => this.notificationService.setNotification('Vellykket! Rapport slettet.'));
  }

  createReport(data){
    if(!data) return null;
    this.missionReportService.addReport$(this.mission.id, data.reportType, data.files).pipe(take(1))
      .subscribe(res => this.notificationService.setNotification('Vellykket! Rapport lastet opp'));
  }

  editNote(note: MissionNote){
    this.router.navigate(['oppdrag', note.missionId, 'notater', note.id, 'rediger'])
  }

  private deleteMission(){
    this.onBack();
    this.missionService.delete$(this.mission.id).subscribe(
      deleted => {
        if(deleted){
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

  private openDeleteMissionDialog = (e: string) => {
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Bekreft at du ønsker å slette oppdraget.'});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteMission());
  }

  private goToTimesheets = (e: string) => {
    this.router.navigate(['timer/liste', {returnRoute: this.router.url, mission: JSON.stringify(this.mission)}]);
  }

  private configureMainNav(){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.altNav = true;
    cfg.elevationEnabled = false;
    cfg.backFn = this.onBack;
    
    cfg.bottomSheetButtons = [
      {text: "Registrer timer", icon: "timer", callback: this.goToTimesheets},
      {text: "Legg til rapport", icon: "note_add", callback: this.openCreateReportDialog, allowedRoles: [Roles.Leder]},
      {text: "Legg til notat", icon: "add_comment", callback: this.createNote},
      {text: "Rediger", icon: "edit", callback: this.editMission, allowedRoles: [Roles.Leder]},
      {text: "Slett", icon: "delete_forever", callback: this.openDeleteMissionDialog, allowedRoles: [Roles.Leder]},
    ];

    this.mainNavService.addConfig(cfg);
  }

  private updateMainNavWithMission(mission: Mission){
    if(mission == undefined) return null;
    let cfg = this.mainNavService.getCurrentConfig();

    if(mission.address)
      cfg.title = mission.address.replace(", Norge","").replace(/,/g, "<br />");
    
    cfg.subTitle = mission.finished ? 'Oppdrag ferdig!' : '';
    cfg.subIcon = mission.finished ? 'check' : '';
    this.mainNavService.addConfig(cfg);
  }

  private onBack = () => this.router.navigate(['/oppdrag'])
  
}
