export interface BottomBarIconButton{
    text?: string;
    icon: string;
    allowedRoles?: string[];
    callback: Function;
    aria?: string;
    disabled?: boolean;
}
