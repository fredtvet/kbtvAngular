import { Model } from './base-entity.interface';
import { EmployerForeign } from './relationships/employer-foreign.interface';

export interface User extends Model, EmployerForeign {
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;
};
