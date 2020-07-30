export interface NavItem{
    icon: string;
    text: string;
    routerLink?: string;
    allowedRoles?: string[];
    children?: NavItem[];
}