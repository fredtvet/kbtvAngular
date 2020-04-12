import { NavAction } from '../../components/nav-action.model';
import { ColoredIcon } from '../../interfaces/colored-icon.interface';

export class MainNavConfig {
  constructor(
    public altNav: boolean = false,
    public title: string = null,
    public icon: string = null,
    public subTitle:string = null,
    public subIcon: string = null,
    
    public searchBarEnabled: boolean = false,
    public menuBtnEnabled: boolean = true,

    public iconAction: ColoredIcon = undefined,

    public bottomSheetActions: NavAction[] = [],
    public bottomSheetBtnEnabled: boolean = false,

    public elevationEnabled: boolean = true
  ){}

  };
