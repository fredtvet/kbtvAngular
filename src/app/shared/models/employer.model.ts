import { BaseEntity } from './base-entity.model';

export class Employer extends BaseEntity {
  constructor(
    id: number = null,
    public name: string = null,
    public phoneNumber: string = null,
    public address: string = null,
  ){ super(id);}

  };
