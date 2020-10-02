export interface AppChip {
    text?: string;
    color?: "accent" | "primary" | "warn" | "background" | "foreground"

    onRemoved?: Function;
    onClick?: Function;
}