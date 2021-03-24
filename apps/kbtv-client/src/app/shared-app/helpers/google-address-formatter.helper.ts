import { IAddress } from "@core/models/sub-interfaces/iaddress.interface";
import { Immutable } from "global-types";

export function _googleAddressFormatter(t: Immutable<IAddress>): Immutable<IAddress> {
    return {...t, address: t.address?.replace(', Norge', '') }
}