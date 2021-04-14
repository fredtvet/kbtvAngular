import { StateAction } from "state-management";

export type ActionDescriptionMap = { [key: string]: (x: StateAction) => string };