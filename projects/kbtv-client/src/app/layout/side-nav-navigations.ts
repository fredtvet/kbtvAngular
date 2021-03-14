import { RolePermissions } from "@core/configurations/role-permissions.const";
import { Roles } from "@core/roles.enum";
import { NavItem } from "./nav-item/nav-item.interface";

export const SideNavNavigations: NavItem[] = [
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
        icon: "date_range",
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
