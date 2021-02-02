export interface ProfileAction { 
    text: string, 
    icon: string, 
    hint?: string,
    callback: Function, 
    params?: unknown[];
}