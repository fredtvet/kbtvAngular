import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormComponent } from 'src/app/core/form/form-component.interface';
import { NotificationService, NotificationType } from 'src/app/core/services/notification';
import { SaveAction, StateAction } from 'src/app/core/state';
import { UsersStore } from '../users.store';

@Component({
  selector: 'app-new-password-form',
  template: `
  <app-new-password-form-view
    [userName]="config.userName"
    (formSubmitted)="onSubmit($event)">
  </app-new-password-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPasswordFormComponent implements FormComponent {
 
  @Input() config: {userName: string};
  @Output() formSubmitted = new EventEmitter<SaveAction>();

  constructor(
    private store: UsersStore,
    private notificationService: NotificationService) {}

  onSubmit(result:any): void{
    if(!result || result == null) this.formSubmitted.emit();
    
    this.store.updatePassord$(this.config?.userName, result.newPassword).subscribe(x => {
      this.notificationService.notify({
        title:'Vellykket oppdatering!',        
        type: NotificationType.Success
      })
      this.formSubmitted.emit(StateAction.Update);
    })
  }
}
