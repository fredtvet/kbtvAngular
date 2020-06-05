import { Mission } from 'src/app/shared/interfaces/models';

export interface MissionDetailsViewModel{
    mission: Mission, 
    imageCount:number,
    noteCount:number, 
    documentCount:number
}