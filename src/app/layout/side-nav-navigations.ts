import { RolePresets } from 'src/app/shared-app/enums';
import { AppButton } from 'src/app/shared-app/interfaces';

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
    allowedRoles: RolePresets.Internal
  },
  {
    icon: "dns",
    text: "Administrering",
    allowedRoles: RolePresets.Authority,
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
    allowedRoles: RolePresets.Authority,
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
