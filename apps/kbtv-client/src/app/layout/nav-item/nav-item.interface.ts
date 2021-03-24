export interface NavItem {
    text?: string;
    icon?: string;

    allowedRoles?: string[];
    routerLink?: string;
    children?: NavItem[];
}