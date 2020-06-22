import { Injectable, Injector } from "@angular/core";
import { PersistentSubject } from './abstracts/persistent.subject';
import { LocalStorageService } from '../local-storage.service';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { BaseSyncService } from './abstracts/base-sync.service';
import { BaseEntity } from '../../models/base-entity.interface';
import { MissionService } from './mission/mission.service';
import { MissionTypeService } from './mission-type/mission-type.service';
import { MissionImageService } from './mission-image/mission-image.service';
import { MissionNoteService } from './mission-note/mission-note.service';
import { MissionDocumentService } from './mission-document/mission-document.service';
import { EmployerService } from './employer/employer.service';
import { DocumentTypeService } from './document-type/document-type.service';
import { UserTimesheetService } from './user-timesheet/user-timesheet.service';

export interface SyncConfig{syncRefreshTime?: number; initialNumberOfMonths?: string;}

export interface EntitySyncConfig{
    httpResponseKey: string, 
    httpRequestKey: string,
    serviceInjectorToken: any, 
    service?: BaseSyncService<BaseEntity>
}

@Injectable({
    providedIn: 'root'
})
export class DataSyncConfig extends PersistentSubject<SyncConfig> {

    constructor(
        localStorageService: LocalStorageService,
        injector: Injector
    ) { 
        super(localStorageService, 'syncConfig', {syncRefreshTime: 60*30, initialNumberOfMonths: '48'}); 
        this.syncEntities.forEach(x => x.service = injector.get(x.serviceInjectorToken))
    }
    
    config$ = this.data$.pipe(distinctUntilChanged(), map(x => {return {...x}}));
    syncRefreshTime$ = this.data$.pipe(map(x => x.syncRefreshTime), distinctUntilChanged());
    initialNumberOfMonths$ = this.data$.pipe(map(x => x.initialNumberOfMonths), distinctUntilChanged());
    
    updateConfig = (syncConfig: SyncConfig) => this.dataSubject.next(syncConfig);
    
    readonly syncEntities = <EntitySyncConfig[]>[
        {httpResponseKey: 'missionSync', httpRequestKey: 'missionTimestamp', serviceInjectorToken: MissionService},
        {httpResponseKey: 'missionTypeSync', httpRequestKey: 'missionTypeTimestamp', serviceInjectorToken: MissionTypeService},
        {httpResponseKey: 'missionImageSync', httpRequestKey: 'missionImageTimestamp', serviceInjectorToken: MissionImageService},
        {httpResponseKey: 'missionNoteSync', httpRequestKey: 'missionNoteTimestamp', serviceInjectorToken: MissionNoteService},
        {httpResponseKey: 'missionDocumentSync', httpRequestKey: 'missionDocumentTimestamp', serviceInjectorToken: MissionDocumentService},
        {httpResponseKey: 'employerSync', httpRequestKey: 'employerTimestamp', serviceInjectorToken: EmployerService},
        {httpResponseKey: 'documentTypeSync', httpRequestKey: 'documentTypeTimestamp', serviceInjectorToken: DocumentTypeService},   
        {httpResponseKey: 'userTimesheetSync', httpRequestKey: 'userTimesheetTimestamp', serviceInjectorToken: UserTimesheetService},
    ]
}

