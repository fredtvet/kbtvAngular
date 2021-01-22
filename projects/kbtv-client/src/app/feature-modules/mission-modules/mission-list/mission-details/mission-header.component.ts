import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Mission } from "@core/models";

@Component({
    selector: 'app-mission-header',
    template: `
        <div contentHeader class="pl-6 pr-6 pb-5">
            <div *ngFor="let line of titleLines">{{ line }}</div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionHeaderComponent {
    private _mission: Mission;

    get mission(): Mission { return this._mission };

    @Input('mission') 
    set mission(value: Mission) {
      this._mission = value;
      this.titleLines = 
        this._mission?.address?.split(',').filter(x => x.toLowerCase().replace(/\s/g, '') !== 'norge') 
        || []
    }
    // subTitle: mission?.finished ? 'Oppdrag ferdig!' : `ID: ${mission?.id}`,
    // subIcon: mission?.finished ? 'check' : '',
    titleLines: string[];
}