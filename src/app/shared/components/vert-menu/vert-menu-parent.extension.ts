import { NavAction } from '../nav-action.model';

export class VertMenuParentExtension{
  public vertActions: NavAction[] = [];

  handleVertEvent(e: string){
    console.log(this.vertActions);
    this.vertActions.forEach(action => {
      if(action.event == e){
        console.log(action);
        action.handle(action.event, this);
      }
    });
  }

}
