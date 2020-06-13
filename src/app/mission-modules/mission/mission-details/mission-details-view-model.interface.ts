import { Mission } from 'src/app/core/models';

export interface MissionDetailsViewModel{
    mission: Mission, 
    imageCount:number,
    noteCount:number, 
    documentCount:number
}