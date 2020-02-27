import { NavAction } from '../nav-action.model';
import { SubscriptionComponent } from 'src/app/subscription.component';

export abstract class VertMenuParent extends SubscriptionComponent{
  public vertActions: NavAction[] = [];

  handleVertEvent(e: string){
    this.vertActions.forEach(action => {
      if(action.event == e){
        action.handle(action.event, this);
      }
    });
  }

}
