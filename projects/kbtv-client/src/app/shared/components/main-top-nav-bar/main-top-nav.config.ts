import { AppButton } from "@shared-app/interfaces/app-button.interface";

export interface MainTopNavConfig  {
    title?: string;
    subTitle?:string;

    backFn?: Function;
    backFnParams?: unknown[];

    buttons?: AppButton[];
}