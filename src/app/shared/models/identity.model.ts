import { User } from "./user.model";

export interface Identity {
  token: string;
  user: User;
}
