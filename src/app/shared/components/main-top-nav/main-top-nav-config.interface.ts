import { AppButton } from 'src/app/shared-app/interfaces';
import { SearchBarConfig } from '../../interfaces/search-bar-config.interface';

export interface MainTopNavConfig{
    title?: string;
    longTitle?: string[];
    
    searchBar?: SearchBarConfig;
    imgSrc?: string;

    subTitle?:string;
    subIcon?: string;

    backFn?: Function;
    backFnParams?: any[];

    buttons?: AppButton[];
}