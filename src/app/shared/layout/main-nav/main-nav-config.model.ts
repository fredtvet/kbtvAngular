import { NavAction } from '../../components/nav-action.model';

export class MainNavConfig {
  constructor(
    public altNav: boolean = false,
    public title: string = null,
    public icon: string = null,
    public subTitle:string = null,
    public subIcon: string = null,
    public bottomNavEnabled: boolean = true,
    public searchBarEnabled: boolean = false,
    public deleteEnabled: boolean = false,
    public menuBtnEnabled: boolean = true,
    public vertActions: NavAction[] = [],
  ){}

  };
