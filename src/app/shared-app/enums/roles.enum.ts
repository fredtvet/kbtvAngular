export enum Roles {
  Leder = "Leder",
  Mellomleder = "Mellomleder",
  Ansatt = "Ansatt",
  Oppdragsgiver = "Oppdragsgiver"
}

export const RolePresets = {
  All: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt, Roles.Oppdragsgiver],
  Internal: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt],
  External: [Roles.Oppdragsgiver],
  Authority: [Roles.Leder]
}