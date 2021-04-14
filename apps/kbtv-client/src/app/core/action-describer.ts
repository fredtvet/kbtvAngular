import { InjectionToken } from "@angular/core";
import { StateAction } from "state-management";

export const ACTION_DESCRIBER= new InjectionToken<ActionDescriber>("ActionDescriptorToken");

export type ActionDescriber<TAction extends StateAction = StateAction> = {[key: string]: ActionDescriberFn<TAction>}

export type ActionDescriberFn<TAction extends StateAction> = (action: TAction) => string;