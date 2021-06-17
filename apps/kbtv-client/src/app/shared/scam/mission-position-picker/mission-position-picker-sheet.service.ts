import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { MatBottomSheet, MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, tap } from "rxjs/operators";
import { MissionPositionPickerSheetWrapperComponent, SheetClosedByUserEvent } from "./mission-position-picker-sheet-wrapper.component";

@Injectable({providedIn: "any"})
export class MissionPositionPickerSheetService {

    constructor(
        private matSheet: MatBottomSheet,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location
    ){}

    open(missionId: string): MatBottomSheetRef<MissionPositionPickerSheetWrapperComponent> { 
        this.appendPickerQuery()
        
        const ref = this.matSheet.open(MissionPositionPickerSheetWrapperComponent, {
            panelClass: "mission-position-picker-sheet", 
            data: { missionId }
        });

        ref.afterDismissed().pipe(
            filter(x => x === SheetClosedByUserEvent),
            tap(x => this.location.back())
        ).subscribe();

        return ref;
    }

    private appendPickerQuery(): void {
        this.router.navigate([], { 
            relativeTo: this.route, 
            queryParams: {picker: true}, 
            queryParamsHandling: 'merge' 
        });
    }
}