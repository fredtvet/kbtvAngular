import { RolePermissions } from "@core/configurations/role-permissions.const";
import { Roles } from "@core/roles.enum";
import { AppButton } from "@shared-app/interfaces/app-button.interface";

export const BottomNavNavigations: AppButton[] = [
  {
    icon: "home",
    text: "Hjem",
    routerLink: "/hjem",
    aria: "Gå til hjem"
  },
  {
    icon: "view_list",
    text: "Oppdrag",
    routerLink: "/oppdrag",
    aria: "Gå til oppdrag"
  },
  {
    icon: "person",
    text: "Profil",
    routerLink: "/profil",
    aria: "Gå til profil",
    allowedRoles: [Roles.Oppdragsgiver],
  },  
  {
    icon: "timer",
    text: "Timer",
    routerLink: "/mine-timer",
    aria: "Gå til timeliste",
    allowedRoles: RolePermissions.UserTimesheetWeek.access,
  },
]