import { Model } from './base-entity.interface';
import { EmployerForeign } from './relationships/employer-foreign.interface';
import { IContactable } from './sub-interfaces/icontactable.interface';

export interface User extends Model, EmployerForeign,  IContactable {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  lastCommandStatus: boolean;
};
