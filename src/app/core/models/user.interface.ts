import { Employer } from './employer.interface';

export interface User {
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  role: string;

  employerId: number;
  employer: Employer;
};
