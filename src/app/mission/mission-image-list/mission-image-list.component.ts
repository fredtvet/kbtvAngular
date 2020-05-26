import { Component, OnInit } from "@angular/core";
import { MatBottomSheet } from "@angular/material";
import { MailImageSheetComponent } from "../components/mail-image-sheet/mail-image-sheet.component";
import { filter, map } from "rxjs/operators";
import { Roles } from 'src/app/shared/enums';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { MissionImage } from 'src/app/shared/models';
import { MissionImageService, MainNavService, NotificationService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: "app-mission-image-list",
  templateUrl: "./mission-image-list.component.html",
  styleUrls: ["./mission-image-list.component.scss"],
})


export class MissionImageListComponent implements OnInit {
  Roles = Roles;

  images$: Observable<MissionImage[]>;

  disableImageViewer: boolean = false; //Workaround to prevent ghost clicks on images

  constructor(
    private notificationService: NotificationService,
    private mainNavService: MainNavService,
    private missionImageService: MissionImageService,
    private route: ActivatedRoute,
    private router: Router) {
      this.configureMainNav(this.missionId)
    }

  get missionId() {
    return +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.images$ = this.missionImageService.getByMissionId$(this.missionId);
  }

  uploadImages = (files: FileList) => {
    this.missionImageService.addImages$(this.missionId, files).subscribe(data =>
      this.notificationService.setNotification(
        `Vellykket! ${data.length} ${data.length > 1 ? 'bilder' : 'bilde'} lastet opp.`
        )
    );
  }

  private configureMainNav(missionId: number){
    let cfg = this.mainNavService.getDefaultConfig();
    cfg.backFn = this.onBack;  
    cfg.backFnParams = [missionId];
    cfg.title = 'Bilder'
    this.mainNavService.addConfig(cfg);
  }

  private onBack = (missionId: number) => this.router.navigate(['/oppdrag', missionId, 'detaljer'])
}
