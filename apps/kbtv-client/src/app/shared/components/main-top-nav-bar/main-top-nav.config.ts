import { AppButton } from "@shared-app/interfaces/app-button.interface";

export interface MainTopNavConfig  {
    title?: string;
    subTitle?:string;

    customCancelFn?: Function;

    buttons?: AppButton[];
}