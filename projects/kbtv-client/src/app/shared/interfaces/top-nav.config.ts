import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { SearchBarConfig } from '../components/search-bar/search-bar-config.interface';

export interface TopNavConfig{
    searchBar?: SearchBarConfig;

    subTitle?:string;
    subIcon?: string;

    backFn?: Function;
    backFnParams?: unknown[];
    backIcon?: string;

    buttons?: AppButton[];
}