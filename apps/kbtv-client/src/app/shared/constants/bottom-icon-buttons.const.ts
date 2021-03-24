import { BottomBarIconButton } from "@shared/components/bottom-action-bar/bottom-bar-icon-button.interface";

export const BottomIconButtons: Record<string, Pick<BottomBarIconButton, "icon" | "text" | "aria">> = {
    Search: {icon: "search", text: "Søk", aria: "Søk"},
    Filter: {icon: "filter_list", text: "Filtre", aria: "Filtre"},
    Edit: {text: "Rediger", icon: "edit", aria: "Rediger"},   
    Delete: {text: "Slett", icon: "delete_forever", aria: "Slett"} ,
    Add: {text: "Lag ny", icon: "add", aria: "Lag ny"},
}