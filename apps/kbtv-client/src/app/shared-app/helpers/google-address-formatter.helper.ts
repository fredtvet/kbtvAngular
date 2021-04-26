import { IAddress } from "@core/models/sub-interfaces/iaddress.interface";
import { Immutable } from "global-types";

export function _googleAddressFormatter<T extends IAddress>(t: Immutable<T>): Immutable<T> {
    console.log(t);
    return {...t, address: t.address?.replace(', Norge', '') }
}