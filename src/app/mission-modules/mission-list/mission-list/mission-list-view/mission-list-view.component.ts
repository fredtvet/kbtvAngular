import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { Mission } from 'src/app/core/models';
import { _trackByModel } from 'src/app/shared-app/helpers/trackby/track-by-model.helper';

@Component({
  selector: 'app-mission-list-view',
  templateUrl: './mission-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionListViewComponent {
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  
  @Input() missions: Mission[];
  @Input() scrollToMissionId: string;

  constructor() { }

  checkCount = 0;

  ngAfterViewChecked(){ //First render doesnt work? Cant use afterViewInit. 
    this.checkCount++;
    if(this.checkCount !== 2) return;
    const selectedIndex = this.missions.findIndex(m => m.id === this.scrollToMissionId);
    if(selectedIndex > -1){
      this.viewPort.scrollToIndex(selectedIndex);
    }
  }

  trackByFn = _trackByModel("missions");
}
