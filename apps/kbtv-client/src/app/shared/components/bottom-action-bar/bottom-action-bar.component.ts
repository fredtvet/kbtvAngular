import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DeviceInfoService } from '@core/services/device-info.service';
import { BottomSheetMenuService } from '@shared/bottom-sheet-menu/bottom-sheet-menu.service';
import { ButtonTypes } from '@shared-app/enums/button-types.enum';
import { AppButton } from '@shared-app/interfaces/app-button.interface';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MainNavService } from 'src/app/layout/main-nav.service';
import { _trackByAppButton } from '@shared-app/track-by-app-button';
import { _getAuthenticatedResources } from '@shared-app/helpers/get-authenticated-resources.helper';

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
    @Input() alwaysDisplayBar: boolean;
    
    baseActionBtn: Partial<AppButton> = {type: ButtonTypes.Icon, allowedRoles: undefined }
    baseFabBtn: Partial<AppButton> = {type: ButtonTypes.Fab }

    private userActions$ = combineLatest([
        this.mainNavService.currentUser$,
        this.actionsSubject.asObservable()
    ]).pipe(map(([currentUser, actions]) => currentUser ? _getAuthenticatedResources(actions, currentUser) : []))
    
    vm$: Observable<{isXs: boolean}> = combineLatest([
        this.deviceInfoService.isXs$,
        this.userActions$
    ]).pipe(
        map(([isXs, actions]) => { 
            if(!actions || !isXs || actions.length < 3) return {isXs, actions};
            const actionsClone = [...actions];
            return { isXs, actions: [
                actionsClone.shift(),
                {
                    icon: "more_vert", text: "Mer",
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

    trackByButton = _trackByAppButton
}

