import { Model } from './base-entity.interface';
import { EmployerForeign } from './relationships/employer-foreign.interface';
import { IContactable } from './sub-interfaces/icontactable.interface';
import { IFullName } from './sub-interfaces/ifullname.interface';

export interface User extends Model, EmployerForeign, IContactable, IFullName {
  userName: string;
  role: string;
};
