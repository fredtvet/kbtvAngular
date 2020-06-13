export interface AppAction{
    callback: Function;
    params?: any[];
    allowedRoles?: string[];
}