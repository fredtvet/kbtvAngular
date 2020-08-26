import { Mission } from 'src/app/core/models';

export interface MissionDetails { 
    mission: Mission, 
    imageCount: number, 
    documentCount: number, 
    noteCount: number 
}