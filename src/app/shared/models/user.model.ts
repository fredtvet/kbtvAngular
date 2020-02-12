import { BaseEntity } from './base-entity.model';

export class User extends BaseEntity {
  constructor(
    public userName: string = null,
    public firstName: string = null,
    public lastName: string = null,
    public phoneNumber: string = null,
    public email: string = null,
    public role: string = null
  ){ super();}

  };
