import { Employer } from './employer.interface';
import { TempEntity } from './temp-entity.interface';

export interface User extends TempEntity {
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;

  employerId: number;
  employer: Employer;
};
