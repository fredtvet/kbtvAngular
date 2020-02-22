import { ROLES } from '../roles.enum';

export class NavAction{
  constructor(
    public text: string = null,
    public icon: string = null,
    public event: string,
    public handle: any = null,
    public roles: string[] = [
      ROLES.Ansatt,
      ROLES.Mellomleder,
      ROLES.Leder,
      ROLES.Oppdragsgiver
    ],
  ){};
}
