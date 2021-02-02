import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeviceInfoService } from '@core/services/device-info.service';
import { BottomSheetMenuService } from '@core/services/ui/bottom-sheet-menu.service';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MainNavService } from 'src/app/layout/main-nav.service';

export interface ViewModel { isXs: boolean, actions: AppButton[] }

@Component({
  selector: 'app-bottom-action-bar',
  templateUrl: './bottom-action-bar.component.html',
  styleUrls: ['./bottom-action-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomActionBarComponent {

    private actionsSubject = new BehaviorSubject<AppButton[]>([]);

    @Input('actions') 
    set actions(value: AppButton[]) { this.actionsSubject.next(value); } 

    @Input() fab: AppButton;

    baseActionBtn: Partial<AppButton> = {type: ButtonTypes.Icon}
    baseFabBtn: Partial<AppButton> = {type: ButtonTypes.Fab }
    
    vm$: Observable<{isXs: boolean}> = combineLatest([
        this.deviceInfoService.isXs$,
        this.actionsSubject.asObservable()
    ]).pipe(
        map(([isXs, actions]) => { 
            if(!actions || !isXs || actions.length < 3) return {isXs, actions};
            const actionsClone = [...actions];
            return { isXs, actions: [
                <AppButton> actionsClone.shift(),
                {
                    icon: "more_vert",
                    callback: () => this.menuService.open(actionsClone)
                }
            ]}
        })
    )

    constructor(
        private deviceInfoService: DeviceInfoService,
        private mainNavService: MainNavService,
        private menuService: BottomSheetMenuService
    ){};

    toggleDrawer = () => this.mainNavService.toggleDrawer();
}

