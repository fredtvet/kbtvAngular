import { MissionType } from './mission-type.interface';
import { Employer } from './employer.interface';
import { BaseEntity } from './base-entity.interface';

export interface Mission extends BaseEntity {
    phoneNumber: string;
    description: string;
    address: string;
    finished: boolean;
    imageURL: string;

    updatedAt: Date;
    lastVisited: Date;

    employerId: number;   
    employer: Employer;

    missionTypeId: number;
    missionType: MissionType;
};
