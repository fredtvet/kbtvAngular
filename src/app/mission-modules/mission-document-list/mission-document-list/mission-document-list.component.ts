import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MissionDocument } from 'src/app/core/models';
import { DeviceInfoService, DownloaderService } from 'src/app/core/services';
import { Roles } from 'src/app/shared-app/enums';
import { AppButton } from 'src/app/shared-app/interfaces';
import { ConfirmDialogComponent, ConfirmDialogConfig, SelectableListBase } from 'src/app/shared/components';
import { MailDocumentFormComponent } from '../mail-document-form.component';
import { MissionDocumentListStore } from '../mission-document-list.store';
import { MainNavService, TopDefaultNavConfig } from 'src/app/layout';
import { FormService } from 'src/app/core/services/form/form.service';
import { appFileUrl } from 'src/app/shared-app/app-file-url.helper';

@Component({
  selector: 'app-mission-document-list',
  templateUrl: './mission-document-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionDocumentListComponent {
  @ViewChild('documentList') documentList: SelectableListBase<MissionDocument>;

  documentsWithType$: Observable<MissionDocument[]> = this.store.getByMissionIdWithType$(this.missionId);
  isXs$: Observable<boolean> = this.deviceInfoService.isXs$;

  private currentSelections: string[] = [];
  
  get missionId() {
    return this.route.snapshot.paramMap.get('id');
  }

  get selectedItemsFabs(): AppButton[] {
    return [
      {icon: "send", aria: 'Send', colorClass: 'bg-accent', callback: this.openMailDocumentSheet, allowedRoles: [Roles.Leder]}, 
      {icon: "delete_forever", aria: 'Slett', colorClass: 'bg-warn', callback: this.openConfirmDeleteDialog, allowedRoles: [Roles.Leder]}
    ]
  }

  get staticFabs(): AppButton[] {
    return [{icon: "note_add", aria: 'Legg til', colorClass: 'bg-accent', callback: this.openDocumentForm, allowedRoles: [Roles.Leder]}]
  }

  constructor(
    private deviceInfoService: DeviceInfoService,     
    private formService: FormService, 
    private downloaderService: DownloaderService,
    private store: MissionDocumentListStore,
    private mainNavService: MainNavService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) {}
 
  ngOnInit() {
    this.configureMainNav(this.missionId)
  }

  onSelectionChange(selections: string[]){
    if(!selections) return undefined;
    this.currentSelections = selections;
    this.updateFabs();
  }

  downloadDocument = (document: MissionDocument) => 
    this.downloaderService.downloadUrl(appFileUrl(document.fileName, "documents"));

  private updateFabs(){
    let fabs = this.mainNavService.currentFabs;
    let totalFabCount = this.staticFabs.length + this.selectedItemsFabs.length;

    if(this.currentSelections.length === 0 && fabs.length === totalFabCount) //If no selections remove fabs if existing
      this.mainNavService.removeFabsByIcons(this.selectedItemsFabs.map(x => x.icon))
    else if (this.currentSelections.length > 0 && fabs.length === this.staticFabs.length)
      this.mainNavService.addFabs(this.selectedItemsFabs);
  }

  private deleteSelectedDocuments = () => {
    this.store.delete({ids: this.currentSelections});    
    this.documentList.clearSelections();
  }

  private openConfirmDeleteDialog = () => {   
    let config: ConfirmDialogConfig = {message: 'Slett dokument?', confirmText: 'Slett'};
    const deleteDialogRef = this.dialog.open(ConfirmDialogComponent, {data: config});
    deleteDialogRef.afterClosed().pipe(filter(res => res)).subscribe(res => this.deleteSelectedDocuments());
  }
  
  private openMailDocumentSheet = () => {
    let botRef = this.formService.open({
      formComponent: MailDocumentFormComponent,
      formConfig: { toEmailPreset: this.store.getMissionEmployer(this.missionId), ids: this.currentSelections },
    });

    botRef
      .afterDismissed()
      .pipe(filter(result => result?.action != null))
      .subscribe((x) => this.documentList.clearSelections());
  }

  private openDocumentForm = () => 
    this.router.navigate([
      'skjema', 
      {config: JSON.stringify({formConfig:{viewConfig:{lockedValues: {missionId: this.missionId}}}})}
    ], {relativeTo: this.route});

  private onBack = (missionId: string) => this.router.navigate(['/oppdrag', missionId, 'detaljer']);

  private configureMainNav(missionId: string){
    let topCfg = {
      title:  "Dokumenter", 
      backFn: this.onBack, 
      backFnParams: [missionId]
    } as TopDefaultNavConfig;

    this.mainNavService.addConfig({default: topCfg}, this.staticFabs);
  }
}
