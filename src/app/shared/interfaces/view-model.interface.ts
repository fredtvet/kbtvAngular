import { MainTopNavConfig } from '../components/main-top-nav/main-top-nav-config.interface';

export interface ViewModel<T> {
    navConfig?: MainTopNavConfig;
    content: T;
}