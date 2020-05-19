import { Employer } from './employer.model';

export class User {
  constructor(
    public userName: string = null,
    public firstName: string = null,
    public lastName: string = null,
    public phoneNumber: string = null,
    public email: string = null,
    public role: string = null,
    public employerId: string = null
  ){}

  public employer: Employer = null;

  };
