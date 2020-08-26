import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Observable } from "rxjs";
import { Employer, User } from "src/app/core/models";
import { NotificationService } from "src/app/core/services";
import { Notifications, Roles } from "src/app/shared-app/enums";
import { UsersStore } from '../users.store';

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
  Roles = Roles;

  @Input() userNamePreset: string;
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
    if(!this.userNamePreset) this.isCreateForm = true;
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
        type: Notifications.Success
      })
      this.finished.emit();
    });
  }

  private updateUser(user: User) {
    this.store.update$(user).subscribe(x => {
      this.notificationService.notify({
        title:'Vellykket oppdatering!',        
        type: Notifications.Success
      })
      this.finished.emit();
    });
  }
}
