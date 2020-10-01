import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

export interface BottomSheetService{
    open(config: any): MatBottomSheetRef<any, any>;
}