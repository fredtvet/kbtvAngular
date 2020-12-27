import { Maybe } from '@global/interfaces';
import { Employer } from '../employer.interface';

export interface EmployerForeign {
    employerId?: string;
    employer?: Maybe<Employer>;
}