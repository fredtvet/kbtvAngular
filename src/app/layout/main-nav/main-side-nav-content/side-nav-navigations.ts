import { NavItem } from 'src/app/shared-app/interfaces';
import { RolePresets, Roles } from 'src/app/shared-app/enums';

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
    routerLink: "/timer",
    allowedRoles: RolePresets.Internal
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
    text: "Statistikk",
    allowedRoles: [Roles.Leder],
    children: [
      {
        icon: "assessment",
        text: "Timestatistikk",
        routerLink: "/timestatistikk",
      },
    ],
  },
  {
    icon: "person",
    text: "Min Profil",
    routerLink: "/profil"
  },
];
