import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

export interface BottomSheetService{
    open(config: unknown): MatBottomSheetRef<unknown, unknown>;
}