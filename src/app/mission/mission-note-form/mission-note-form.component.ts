import { Component } from '@angular/core';
import { MissionNote } from 'src/app/shared/models';
import { MainNavConfig } from 'src/app/shared/layout';
import { NotificationService, MissionNoteService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';
import { takeUntil, take } from 'rxjs/operators';

@Component({
  selector: 'app-mission-note-form',
  templateUrl: './mission-note-form.component.html'
})
export class MissionNoteFormComponent extends SubscriptionComponent {

  private isCreateForm: boolean = false;
  private noteSub: Subscription = new Subscription();

  mainNavConfig = new MainNavConfig();

  missionId: number = null;
  note: MissionNote = new MissionNote();

  constructor(
    private missionNoteService: MissionNoteService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router)  {super()}

  ngOnInit(){
    this.configureMainNav();
    this.missionId = +this.route.snapshot.paramMap.get('missionId');
    this.note.id = +this.route.snapshot.paramMap.get('id');

    if(!this.note.id) this.isCreateForm = true;
    else this.noteSub = this.missionNoteService.get$(this.note.id)
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(result => this.note = result);
  }

  onSubmit(result: MissionNote){
    if(!result) this.onBack();
    else if(!this.isCreateForm) this.editNote(result);
    else this.createNote(result);
  }

  createNote(note: MissionNote){
    if(note){
      this.missionNoteService.add$(note).pipe(take(1))
      .subscribe(note => {
        this.notificationService.setNotification('Vellykket! Notat opprettet.');
        this.onBack();
      });
    }
  }

  editNote(note: MissionNote){
    if(!note) return null;
    this.missionNoteService.update$(note).pipe(take(1))
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
