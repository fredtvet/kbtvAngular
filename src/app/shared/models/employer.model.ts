import { BaseEntity } from '../interfaces';

export class Employer implements BaseEntity {
  constructor(
    public id: number = null,
    public name: string = null,
    public phoneNumber: string = null,
    public address: string = null,
  ){}
  };
