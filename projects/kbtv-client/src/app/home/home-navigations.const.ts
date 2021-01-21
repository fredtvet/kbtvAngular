import { RolePermissions } from "@core/configurations/role-permissions.const";
import { Roles } from "@core/roles.enum";
import { AppButton } from "@shared-app/interfaces/app-button.interface";

export const HomeNavigations: AppButton[] = [
    {
        icon: "view_list",
        text: "Oppdrag",
        routerLink: "/oppdrag",
        aria: "Åpne oppdrag"
    },
    {
        icon: "timer",
        text: "Timer",
        routerLink: "/mine-timer",
        aria: "Åpne timeliste",
        allowedRoles: RolePermissions.UserTimesheetWeek.access,
    },
    {
        icon: "person",
        text: "Profil",
        routerLink: "/profil",
        aria: "Åpne profil",
        allowedRoles: [Roles.Oppdragsgiver],
    }, 
    {
        icon: "dns",
        text: "Data",
        routerLink: "/data",
        aria: "Åpne dataverktøy ",
        allowedRoles: RolePermissions.DataManagement.access,
    },   
    {
        icon: "people",
        text: "Brukere",
        routerLink: "/brukere",
        aria: "Åpne brukerliste",
        allowedRoles: RolePermissions.Users.access,
    },
    {
        icon: "date_range",
        text: "Timeadministering",
        routerLink: "/timeadministrering",
        aria: "Åpne timeadministrering",
        allowedRoles: RolePermissions.TimesheetAdmin.access,
    },
    {
        icon: "assessment",
        text: "Timestatistikk",
        routerLink: "/timestatistikk",
        aria: "Åpne timestatistikk",
        allowedRoles: RolePermissions.TimesheetStatistic.access,
    },
]