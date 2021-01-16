import { Roles } from "@core/roles.enum";

export const RolePermissions = {
    DataManagement: {access: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt]},
    MissionDocumentList: {
        access: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt],
        create: [Roles.Leder], delete: [Roles.Leder],
        sendEmail: [Roles.Leder],
    },
    MissionImageList: {
        create: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt],
        delete: [Roles.Leder],
        sendEmail: [Roles.Leder],
    },
    MissionList: {
        create: [Roles.Leder, Roles.Mellomleder],
        update: [Roles.Leder],
        delete: [Roles.Leder],
    },
    MissionNoteList: {
        access: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt],
        create: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt],
        update: [Roles.Leder],
        delete: [Roles.Leder],
    },
    TimesheetAdmin: {
        access: [Roles.Leder]
    },
    TimesheetStatistic: {
        access: [Roles.Leder]
    },
    Users: {
        access: [Roles.Leder]
    },
    UserTimesheetList: {
        access: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt]
    },
    UserTimesheetWeek: {
        access: [Roles.Leder, Roles.Mellomleder, Roles.Ansatt]
    }
}