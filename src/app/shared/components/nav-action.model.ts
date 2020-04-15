import { Roles } from '../enums/roles.enum';

export class NavAction{
  constructor(
    public text: string = null,
    public icon: string = null,
    public event: string,
    public handle: Function = null,
    public roles: string[] = [
      Roles.Ansatt,
      Roles.Mellomleder,
      Roles.Leder,
      Roles.Oppdragsgiver
    ],
  ){};
}
