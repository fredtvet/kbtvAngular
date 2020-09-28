import { MissionChild } from './relationships/mission-child.interface';

export interface MissionNote extends MissionChild{
    id: string,
    title: string;
    content: string;
    pinned: boolean;

    createdBy: string;
};
