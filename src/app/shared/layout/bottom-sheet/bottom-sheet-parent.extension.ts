import { SubscriptionComponent } from 'src/app/subscription.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from './bottom-sheet.component';
import { BottomSheetActionHubService } from 'src/app/core/services';
import { takeUntil } from 'rxjs/operators';
import { NavAction } from '../../components/nav-action.model';

export abstract class BottomSheetParent extends SubscriptionComponent{
  public bottomSheetActions: NavAction[] = [];

  constructor(
    private bottomSheetActionHub: BottomSheetActionHubService,
    private _bottomSheet: MatBottomSheet){
    super();
  }

  ngOnInit(): void {
    this.bottomSheetActionHub.eventHub$.pipe(takeUntil(this.unsubscribe)).subscribe(this.handleBottomSheetEvent)
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent, { data: this.bottomSheetActions });
  }

  handleBottomSheetEvent(action: NavAction): void{  
    if(action == null) return undefined;
    action.handle(action.event, this);
  }

}
