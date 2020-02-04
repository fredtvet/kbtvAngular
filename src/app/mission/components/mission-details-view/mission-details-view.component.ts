import { Component, Output, EventEmitter, Input } from '@angular/core';
import { MissionDetails, ROLES } from 'src/app/shared';

@Component({
  selector: 'app-mission-details-view',
  templateUrl: './mission-details-view.component.html',
  styleUrls: ['./mission-details-view.component.scss']
})
export class MissionDetailsViewComponent {

  public ROLES = ROLES;

  @Input() missionDetails: MissionDetails;
  @Output() imagesUploaded = new EventEmitter();
  @Output() imageDeleted = new EventEmitter();
  @Output() loadNoteDetails = new EventEmitter();
  @Output() editNote = new EventEmitter();
  @Output() deleteNote = new EventEmitter();

  constructor() { }

}
