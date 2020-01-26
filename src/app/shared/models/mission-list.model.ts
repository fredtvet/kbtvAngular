import { Pagination } from './pagination.model';

export class MissionList{
  missions: MissionListItem[];
  paginationInfo: Pagination;
}

class MissionListItem{
  id: number;
  address: string;
  createdAt: string;
  finished: boolean;
}
