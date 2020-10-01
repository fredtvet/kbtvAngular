import { ModelState } from 'src/app/core/services/model/interfaces';
import { Prop } from 'src/app/shared-app/prop.type';

export interface StoreState extends ModelState {
    selectedProperty: Prop<ModelState>,
} 