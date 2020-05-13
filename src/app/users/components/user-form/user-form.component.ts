import { Component, Output, EventEmitter, Input } from "@angular/core";
import { MatDialog } from "@angular/material";
import {
  RoleService,
  UserService,
  NotificationService,
  MainNavService,
} from "src/app/core/services";
import { ConfirmDialogComponent } from "src/app/shared/components";
import { User } from "src/app/shared/models";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map, takeUntil, take, filter } from "rxjs/operators";
import { SubscriptionComponent } from "src/app/shared/components/abstracts/subscription.component";
import { Roles } from "src/app/shared/enums";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
})
export class UserFormComponent {
  Roles = Roles;

  @Input() userNamePreset: string;
  @Output() finished = new EventEmitter();

  isCreateForm = false;

  user$: Observable<User>;
  roles$: Observable<string[]>;

  constructor(
    private notificationService: NotificationService,
    private _roleService: RoleService,
    private _userService: UserService
  ) {}

  ngOnInit() {
    if (!this.userNamePreset) this.isCreateForm = true;
    else this.user$ = this._userService.get$(this.userNamePreset);

    this.roles$ = this._roleService.getAll$().pipe(
      map((arr) => arr.filter((x) => x != Roles.Leder && x != Roles.Oppdragsgiver))
    );
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
