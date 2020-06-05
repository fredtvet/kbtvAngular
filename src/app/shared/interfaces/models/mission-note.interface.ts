import { MissionChild } from '../mission-child.interface';

export interface MissionNote extends MissionChild{
    title: string;
    content: string;
    pinned: boolean;

    createdAt: string;
    createdBy: string;
};
