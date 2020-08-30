import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable } from "rxjs";
import { Employer, User } from "src/app/core/models";
import { Roles } from "src/app/shared-app/enums";
import { FormAction } from 'src/app/shared/enums';
import { FormConfig } from 'src/app/shared/interfaces';
import { UsersStore } from '../users.store';
import { NotificationType, NotificationService } from 'src/app/core/services/notification';

@Component({
  selector: "app-user-form",
  template: `
  <app-user-form-view
    [users]="users$ | async"
    [userNamePreset]="config.entityId"
    [roles]="roles"
    [employers]="employers$ | async"
    (formSubmitted)="onSubmit($event)">
  </app-user-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
  Roles = Roles;

  @Input() config: FormConfig;
  @Output() finished = new EventEmitter();

  isCreateForm = false;

  employers$: Observable<Employer[]> = this.store.property$("employers");
  users$: Observable<User[]> = this.store.property$("users");
  roles: string[] = Object.keys(Roles).map(key => Roles[key] as string);

  constructor(
    private notificationService: NotificationService,
    private store: UsersStore
  ) {}

  ngOnInit() {
    if(!this.config?.entityId) this.isCreateForm = true;
  }

  onSubmit(result: User) {
    if (!result) this.finished.emit();
    else if (!this.isCreateForm) this.updateUser(result);
    else this.createUser(result);
  }

  private createUser(user: any) {
    this.store.add$(user).subscribe(x => {
      this.notificationService.notify({
        title:'Vellykket! Ny bruker registrert.',        
        type: NotificationType.Success
      })
      this.finished.emit(FormAction.Create);
    });
  }

  private updateUser(user: User) {
    this.store.update$(user).subscribe(x => {
      this.notificationService.notify({
        title:'Vellykket oppdatering!',        
        type: NotificationType.Success
      })
      this.finished.emit(FormAction.Update);
    });
  }
}
