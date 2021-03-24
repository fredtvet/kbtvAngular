import { AppButton } from "@shared/components/app-button/app-button.interface";

export interface MainTopNavConfig  {
    title?: string;
    subTitle?:string;

    backFn?: Function;
    backFnParams?: unknown[];

    buttons?: AppButton[];
}