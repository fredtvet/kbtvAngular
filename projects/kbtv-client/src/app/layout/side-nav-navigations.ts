import { RolePermissions } from "@core/configurations/role-permissions.const";
import { Roles } from "@core/roles.enum";
import { AppButton } from "@shared-app/interfaces/app-button.interface";

export const SideNavNavigations: AppButton[] = [
  {
    icon: "home",
    text: "Hjem",
    routerLink: "/hjem",
  },
  {
    icon: "view_list",
    text: "Oppdrag",
    routerLink: "/oppdrag",
  },
  {
    icon: "timer",
    text: "Timer",
    routerLink: "/mine-timer",
    allowedRoles:  RolePermissions.UserTimesheetWeek.access,
  },
  {
    icon: "dns",
    text: "Administrering",
    allowedRoles: [Roles.Leder],
    children: [
      {
        icon: "dns",
        text: "Data",
        routerLink: "/data",
      },
      {
        icon: "people",
        text: "Brukere",
        routerLink: "/brukere",
      },
      {
        icon: "assessment",
        text: "Timer",
        routerLink: "/timeadministrering",
      },
    ],
  },
  {
    icon: "assessment",
    text: "Timestatistikk",
    allowedRoles: RolePermissions.TimesheetStatistic.access,
    routerLink: "/timestatistikk",
  },
  {
    icon: "person",
    text: "Min Profil",
    routerLink: "/profil"
  },
];
