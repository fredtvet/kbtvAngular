import { SearchBarConfig, TopNavConfig } from '../../interfaces';

export interface MainTopNavConfig extends TopNavConfig{
    title: string;
    searchBar?: SearchBarConfig;
}