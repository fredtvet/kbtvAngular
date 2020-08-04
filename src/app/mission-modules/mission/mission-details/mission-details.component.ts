import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Mission } from 'src/app/core/models';
import { ConfirmDialogComponent, ConfirmDialogConfig } from 'src/app/shared/components';
import { NotificationService, MissionService, MissionImageService, MissionDocumentService, MissionNoteService, MainNavService} from 'src/app/core/services';
import { tap, filter, map, take, finalize } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { MissionDetailsViewModel } from './mission-details-view-model.interface';
import { TopDetailNavConfig } from 'src/app/shared-app/interfaces';
import { RolePresets, Roles, Notifications } from 'src/app/shared-app/enums';

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
  ){ }

  ngOnInit(){
    let missionId = +this.route.snapshot.paramMap.get('id');

    let mission$ = this.missionService.getDetails$(missionId);
    let imageCount$ = this.missionImageService.getByMissionId$(missionId).pipe(map(x => x?.length));
    let documentCount$ = this.missionDocumentService.getByMissionId$(missionId).pipe(map(x => x?.length));
    let noteCount$ = this.missionNoteService.getByMissionId$(missionId).pipe(map(x => x?.length));

    this.vm$ = combineLatest(mission$, imageCount$, documentCount$, noteCount$).pipe(
      map(([mission, imageCount, documentCount, noteCount]) => {
        return {mission, imageCount, documentCount, noteCount}
      }),
      tap(x => this.configureMainNav(x.mission))
    );
  }

  uploadImages = (data: {files: FileList, missionId: number}) => {
    this.missionImageService.addImages$(data.missionId, data.files).subscribe(data =>
      this.notificationService.notify({
        title: `Vellykket! ${data.length} ${data.length > 1 ? 'bilder' : 'bilde'} lastet opp.`,
        type: Notifications.Success
      })
    );
  }
  
  private deleteMission = (id: number) =>{
    this.onBack()
    this.missionService.delete$(id).pipe(filter(del => del))
      .subscribe(del => this.notificationService.notify({title: 'Vellykket! Oppdrag slettet.', type: Notifications.Success}));
  }
  
  private openMissionForm = (idPreset: number) => this.router.navigate(['rediger'], {relativeTo: this.route, queryParams: {idPreset}});

  private openDeleteMissionDialog = (id: number) => {
    let config: ConfirmDialogConfig = {message: 'Slett oppdrag?', confirmText: 'Slett'};
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: config});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteMission(id));
  }

  private goToTimesheets = (mission: Mission) => 
    this.router.navigate(['timer/liste', {returnRoute: this.router.url, mission: JSON.stringify(mission)}]);

  private configureMainNav(mission: Mission){
    let cfg = {
      title: mission.address.split(',').filter(x => x.toLowerCase().replace(/\s/g, '') !== 'norge'),
      subTitle: mission.finished ? 'Oppdrag ferdig!' : '',
      subIcon: mission.finished ? 'check' : '',
      imgSrc: mission.imageURL,
      backFn: this.onBack 
    } as TopDetailNavConfig;

    cfg.bottomSheetButtons = [
      {text: "Registrer timer", icon: "timer", callback: this.goToTimesheets, params:[mission], allowedRoles: RolePresets.Internal},
      {text: "Rediger", icon: "edit", callback: this.openMissionForm, params: [mission.id], allowedRoles: [Roles.Leder]},
      {text: "Slett", icon: "delete_forever", callback: this.openDeleteMissionDialog, params: [mission.id], allowedRoles: [Roles.Leder]}
    ];
 
    this.mainNavService.addConfig({detail: cfg});
  }

  private onBack = () => this.router.navigate(['/oppdrag'])
  
}
