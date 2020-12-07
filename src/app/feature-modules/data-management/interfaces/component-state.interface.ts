import { ModelState } from '@model/interfaces';
import { Prop } from '@shared-app/prop.type';

export interface ComponentState {
    selectedProperty: Prop<ModelState>
}