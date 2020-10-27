import { Model } from './base-entity.interface';
import { IAddress } from './sub-interfaces/iaddress.interface';
import { IContactable } from './sub-interfaces/icontactable.interface';
import { IId } from './sub-interfaces/iid.interface';
import { IName } from './sub-interfaces/iname.interface';

export interface Employer extends Model, IContactable, IAddress, IName, IId {};
