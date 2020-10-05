import { AppButton } from 'src/app/shared-app/interfaces';
import { SearchBarConfig } from './search-bar-config.interface';

export interface TopNavConfig{
    searchBar?: SearchBarConfig;
    imgSrc?: string;

    subTitle?:string;
    subIcon?: string;

    backFn?: Function;
    backFnParams?: any[];

    buttons?: AppButton[];
}