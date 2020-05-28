import { Mission } from 'src/app/shared/models';

export interface MissionDetailsViewModel{
    mission: Mission, 
    imageCount:number,
    noteCount:number, 
    documentCount:number
}