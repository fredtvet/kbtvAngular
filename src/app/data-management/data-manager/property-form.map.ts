import { StoreState } from '../interfaces/store-state';
import { BaseModelFormViewComponent } from 'src/app/core/model/form';
import { EmployerFormViewComponent } from '../components/employer-form-view/employer-form-view.component';
import { Type } from '@angular/core';
import { InboundEmailPasswordFormViewComponent } from '../components/inbound-email-password-form-view/inbound-email-password-form-view.component';
import { DocumentTypeFormViewComponent } from '../components/document-type-form-view/document-type-form-view.component';
import { MissionTypeFormViewComponent } from '../components/mission-type-form-view/mission-type-form-view.component';

export const PropertyFormMap: {[key: string]: Type<BaseModelFormViewComponent<any, any, any, any>> } = {
    employers: EmployerFormViewComponent,
    missionTypes: MissionTypeFormViewComponent,
    documentTypes: DocumentTypeFormViewComponent,
    inboundEmailPasswords: InboundEmailPasswordFormViewComponent
}