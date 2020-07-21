export enum Roles {
  Leder = "leder",
  Mellomleder = "mellomleder",
  Ansatt = "ansatt",
  Oppdragsgiver = "oppdragsgiver"
}

export const RolePresets = {
  All: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt, Roles.Oppdragsgiver],
  Internal: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt],
  External: [Roles.Oppdragsgiver],
  Authority: [Roles.Leder]
}