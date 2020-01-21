import { ROLES } from '../roles.enum';

export class NavAction{
  constructor(
    public event: string,
    public text: string,
    public icon: string,
    public roles: string[] = [
      ROLES.Ansatt,
      ROLES.Mellomleder,
      ROLES.Leder,
      ROLES.Oppdragsgiver
    ],
  ){};
}
