import { Component, OnInit, ViewChild } from '@angular/core';
import { MissionReport, Mission } from 'src/app/shared/models';
import { Observable, combineLatest } from 'rxjs';
import { MissionReportService, MainNavService, NotificationService, MissionService, ReportTypeService, DownloaderService, DeviceInfoService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { Roles } from 'src/app/shared/enums';
import { SelectableListBase } from '../components/selectable-list/selectable-list.base';
import { MailReportSheetComponent } from '../components/mail-report-sheet.component';
import { takeUntil, filter, map } from 'rxjs/operators';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { MissionReportFormSheetWrapperComponent } from '../components/mission-report-form/mission-report-form-sheet-wrapper.component';

@Component({
  selector: 'app-mission-report-list',
  templateUrl: './mission-report-list.component.html',
})
export class MissionReportListComponent extends SubscriptionComponent {
  @ViewChild('reportList', {static: false}) reportList: SelectableListBase<MissionReport>;
  Roles = Roles;

  currentSelections: number[] = [];
  reportsWithType$: Observable<MissionReport[]>;
  isXs$: Observable<boolean> = this.deviceInfoService.isXs$;

  private mission: Mission;
  
  constructor(
    private deviceInfoService: DeviceInfoService,     
    private bottomSheet: MatBottomSheet, 
    private downloaderService: DownloaderService,
    private missionReportService: MissionReportService,
    private reportTypeService: ReportTypeService,
    private missionService: MissionService,
    private notificationService: NotificationService,
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    ) { super() }

  get missionId() {
    return +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.configureMainNav(this.missionId)
    let reports$ =  this.missionReportService.getByMissionId$(this.missionId);
    let types$ = this.reportTypeService.getAll$();
    this.reportsWithType$ = combineLatest(reports$,types$).pipe(map(([reports, types]) => 
      reports.map(x => {
        x.reportType = types.find(t => t.id == x.reportTypeId);
        return x;
      })
    ));
    this.missionService.getDetails$(this.missionId)
      .pipe(takeUntil(this.unsubscribe)).subscribe(x => this.mission = x)
  }

  deleteReports = (ids: number[]) => {
    this.missionReportService.deleteRange$(ids).subscribe(data =>
      this.notificationService.setNotification(
        `Vellykket! ${ids.length} ${ids.length > 1 ? 'rapporter' : 'rapport'} slettet.`
        )
    );
  }

  openConfirmDeleteDialog = (ids: number[]) => {
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: 'Bekreft at du ønsker å slette utvalgte rapporter.'});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteReports(ids));
  }
  
  openMailReportSheet = (ids: number[]) => {
    let botRef = this.bottomSheet.open(MailReportSheetComponent, {
      data: { toEmailPreset: this.mission.employer.email, ids: ids },
    });
    botRef
      .afterDismissed()
      .pipe(filter((isSent) => isSent))
      .subscribe((x) => this.reportList.clearSelections());
  }

  openReportForm = () => 
    this.bottomSheet.open(MissionReportFormSheetWrapperComponent, {data: {missionId: this.missionId}});

  downloadReport = (report: MissionReport) => this.downloaderService.downloadUrl(report.fileURL);

  private configureMainNav(missionId: number){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.backFn = this.onBack;  
    cfg.backFnParams = [missionId];
    cfg.title = 'Rapporter';
    this.mainNavService.addConfig(cfg);
  }
  private onBack = (missionId: number) => this.router.navigate(['/oppdrag', missionId, 'detaljer']);
}
