import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MissionDetails, ROLES } from 'src/app/shared';

@Component({
  selector: 'app-mission-details-view',
  templateUrl: './mission-details-view.component.html',
  styleUrls: ['./mission-details-view.component.css']
})
export class MissionDetailsViewComponent {

  public ROLES = ROLES;

  @Input() missionDetails: MissionDetails;
  @Output() imagesUploaded = new EventEmitter();
  @Output() imageDeleted = new EventEmitter();

  constructor() { }

  pinnedNotes(pinned: boolean){
    return this.missionDetails.missionNotes.filter(x => x.pinned == pinned);
  }

}
