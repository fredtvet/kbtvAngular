import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ROLES, Mission, MissionNote, MissionImage, MissionReport } from 'src/app/shared';

@Component({
  selector: 'app-mission-details-view',
  templateUrl: './mission-details-view.component.html',
  styleUrls: ['./mission-details-view.component.scss']
})
export class MissionDetailsViewComponent {

  public ROLES = ROLES;

  @Input() mission: Mission = new Mission();
  @Input() images: MissionImage[] = [];
  @Input() notes: MissionNote[] = [];
  @Input() reports: MissionReport[] = [];

  @Output() imagesUploaded = new EventEmitter();
  @Output() imageDeleted = new EventEmitter();
  @Output() noteEdit = new EventEmitter();
  @Output() noteDeleted = new EventEmitter();

  constructor() { }

  ngOnChanges(): void {
    console.log(this.reports)
  }

}
