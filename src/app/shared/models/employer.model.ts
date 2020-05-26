import { BaseEntity } from '../interfaces/base-entity.interface';

export class Employer implements BaseEntity {
  constructor(
    public id: number = null,
    public name: string = null,
    public phoneNumber: string = null,
    public address: string = null,
    public email: string = null,
  ){}
  };
