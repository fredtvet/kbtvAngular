import { AppButton } from 'src/app/shared-app/interfaces';
import { SearchBarConfig } from './search-bar-config.interface';

export interface TopNavConfig{
    searchBar?: SearchBarConfig;

    subTitle?:string;
    subIcon?: string;

    backFn?: Function;
    backFnParams?: any[];
    backIcon?: string;

    buttons?: AppButton[];
}