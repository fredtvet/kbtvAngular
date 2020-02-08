import { NavAction } from '../nav-action.model';

export class VertMenuParentExtension{
  public vertActions: NavAction[] = [];

  handleVertEvent(e: string){
    this.vertActions.forEach(action => {
      if(action.event == e){
        action.handle(action.event, this);
      }
    });
  }

}
