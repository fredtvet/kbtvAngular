export interface BottomSheetAction {
    text?: string;
    icon?: string;
    allowedRoles?: string[];
    callback?: Function;
    params?: unknown[];
}

