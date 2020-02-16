import { Component } from '@angular/core';
import { MissionNote } from 'src/app/shared';
import { MainNavConfig } from 'src/app/shared/layout/main-nav/main-nav-config.model';
import { NotificationService, MissionNoteService } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-mission-note-form',
  templateUrl: './mission-note-form.component.html'
})

export class MissionNoteFormComponent {

  private isCreateForm: boolean = false;

  mainNavConfig = new MainNavConfig();

  note: MissionNote = null;
  missionId: number = null;

  constructor(
    private missionNoteService: MissionNoteService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router)  { }

  ngOnInit(){
    this.configureMainNav();
    this.missionId = +this.route.snapshot.paramMap.get('missionId');
    let id = +this.route.snapshot.paramMap.get('id');

    if(!id) this.isCreateForm = true;
    else this.missionNoteService.getDetails$(id)
            .subscribe(result => this.note = result);
  }

  onSubmit(result: MissionNote){
    if(!result) this.onBack();
    else if(!this.isCreateForm) this.editNote(result);
    else this.createNote(result);
  }

  createNote(note: MissionNote){
    if(note){
      this.missionNoteService.add$(note)
      .subscribe(note => {
        this.notificationService.setNotification('Vellykket! Notat opprettet.');
        this.onBack();
      });
    }
  }

  editNote(note: MissionNote){
    if(!note) return null;
    this.missionNoteService.update$(note)
      .subscribe(data =>{
        this.notificationService.setNotification('Vellykket oppdatering!');
        this.onBack();
      });
  }

  configureMainNav(){
    if(this.isCreateForm) this.mainNavConfig.title = "Nytt notat";
    else this.mainNavConfig.title = "Rediger notat";
    this.mainNavConfig.altNav = false;
    this.mainNavConfig.menuBtnEnabled = false;
  }

  onBack(): void{
    this.router.navigate(['oppdrag', this.missionId, 'detaljer'])
  }

}
