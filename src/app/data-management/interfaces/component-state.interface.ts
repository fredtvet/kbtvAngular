import { ModelState } from 'src/app/model/interfaces';
import { Prop } from 'src/app/shared-app/prop.type';

export interface ComponentState {
    selectedProperty: Prop<ModelState>
}