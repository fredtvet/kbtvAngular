import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from "@angular/core";
import {
  RoleService,
  UserService,
  NotificationService,
  EmployerService,
} from "src/app/core/services";
import { User, Employer } from "src/app/shared/interfaces/models";
import { Observable } from "rxjs";
import { map} from "rxjs/operators";
import { Roles } from "src/app/shared/enums";

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

  user$: Observable<User>;
  roles$: Observable<string[]>;
  employers$: Observable<Employer[]>;

  constructor(
    private notificationService: NotificationService,
    private _roleService: RoleService,
    private _userService: UserService,
    private _employerService: EmployerService,
  ) {}

  ngOnInit() {
    if(!this.userNamePreset) this.isCreateForm = true;
    else this.user$ = this._userService.get$(this.userNamePreset);

    this.roles$ = this._roleService.getAll$().pipe(
      map((arr) => arr.filter((x) => x != Roles.Leder))
    );
    this.employers$ = this._employerService.getAll$();
  }

  onSubmit(result: User) {
    if (!result) this.finished.emit();
    else if (!this.isCreateForm) this.updateUser(result);
    else this.createUser(result);
  }

  private createUser(user: any) {
    this._userService.add$(user).subscribe((success) => {
      this.notificationService.setNotification("Vellykket! Ny bruker registrert.");
      this.finished.emit(success);
    });
  }

  private updateUser(user: User) {
    this._userService.update$(user).subscribe((success) => {
        this.notificationService.setNotification("Vellykket oppdatering!");
        this.finished.emit(success);
    });
  }
}
