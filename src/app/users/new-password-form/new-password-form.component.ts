import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormAction } from 'src/app/shared/enums';
import { FormConfig } from 'src/app/shared/interfaces';
import { UsersStore } from '../users.store';
import { NotificationType, NotificationService } from 'src/app/core/services/notification';

@Component({
  selector: 'app-new-password-form',
  template: `
  <app-new-password-form-view
    [userName]="config.entityId"
    (formSubmitted)="onSubmit($event)">
  </app-new-password-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPasswordFormComponent {
 
  @Input() config: FormConfig;
  @Output() finished = new EventEmitter();

  constructor(
    private store: UsersStore,
    private notificationService: NotificationService) {}

  onSubmit(result:any): void{
    if(!result || result == null) this.finished.emit();
    
    this.store.updatePassord$(this.config?.entityId, result.newPassword).subscribe(x => {
      this.notificationService.notify({
        title:'Vellykket oppdatering!',        
        type: NotificationType.Success
      })
      this.finished.emit(FormAction.Update);
    })
  }
}
