import { Component } from '@angular/core';
import { MissionNote } from 'src/app/shared/models';
import { NotificationService, MissionNoteService, MainNavService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { takeUntil, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mission-note-form',
  templateUrl: './mission-note-form.component.html'
})
export class MissionNoteFormComponent extends SubscriptionComponent {

  private noteId: number = null;
  private isCreateForm: boolean = false;

  missionId: number = null;
  note$: Observable<MissionNote>;

  constructor(
    private mainNavService: MainNavService,
    private missionNoteService: MissionNoteService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router)  {
      super();
      this.missionId = +this.route.snapshot.paramMap.get('missionId');
      this.noteId = +this.route.snapshot.paramMap.get('id');
      if(!this.noteId) this.isCreateForm = true;
      this.configureMainNav();
    }

  ngOnInit(){
    if(!this.isCreateForm) 
      this.note$ = this.missionNoteService.get$(this.noteId);
  }

  onSubmit(result: MissionNote){
    if(!result) this.onBack();
    else if(!this.isCreateForm) this.editNote(result);
    else this.createNote(result);
  }

  createNote(note: MissionNote){
    if(!note) return null;
    this.missionNoteService.add$(note).subscribe(note => {
      this.notificationService.setNotification('Vellykket! Notat opprettet.');
      this.onBack();
    });
    
  }

  editNote(note: MissionNote){
    if(!note) return null;
    this.missionNoteService.update$(note).subscribe(data =>{
        this.notificationService.setNotification('Vellykket oppdatering!');
        this.onBack();
      });
  }

  configureMainNav(){
    let cfg = this.mainNavService.getDefaultConfig(); 
    cfg.title = this.isCreateForm ? "Nytt notat" : "Rediger notat";
    cfg.backFn = this.onBack;
    cfg.menuBtnEnabled = false;
    this.mainNavService.addConfig(cfg);
  }

  private onBack = () => {
    this.router.navigate(['oppdrag', this.missionId, 'detaljer'])
  }

}
