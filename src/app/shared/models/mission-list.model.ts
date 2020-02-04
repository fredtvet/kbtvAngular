import { Pagination } from './pagination.model';
import { Mission } from './mission.model';

export class MissionList{
  missions: Mission[];
  paginationInfo: Pagination;
}
