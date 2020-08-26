import {
  ChangeDetectionStrategy, Component,

  EventEmitter, Input,

  Output
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, of } from "rxjs";
import { Employer } from 'src/app/core/models';
import { NotificationService } from "src/app/core/services";
import { Notifications, Roles } from "src/app/shared-app/enums";
import { DataManagementStore } from '../../data-management.store';

@Component({
  selector: "app-employer-form",
  template: `
  <app-employer-form-view
    [employer]="employer$ | async"
    (formSubmitted)="onSubmit($event)">
  </app-employer-form-view>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployerFormComponent {
  Roles = Roles;
  @Input() employerIdPreset: number;
  @Output() finished = new EventEmitter();

  googleOptions = {
    types: ["geocode"],
    componentRestrictions: { country: "no" },
  };

  employer$: Observable<Employer>;

  private isCreateForm: boolean = false;

  constructor(
    private store: DataManagementStore,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    if (!this.employerIdPreset) this.isCreateForm = true;
    else this.employer$ = of(null); //placeholder
  }

  onSubmit(result: Employer): void {
    if (!result) this.finished.emit();
    else if (!this.isCreateForm) this.updateEmployer(result);
    else this.createEmployer(result);
  }

  private updateEmployer(employer: Employer): void {
    this.store.update$(employer).subscribe((e) => {
      this.notificationService.notify({title: "Vellykket oppdatering!", type: Notifications.Success});
      this.finished.emit(e);
    });
  }

  private createEmployer(employer: any): void {
    this.store.add$(employer).subscribe((e) => {
      this.notificationService.notify({title: "Vellykket! Ny oppdragsgiver registrert.", type: Notifications.Success});
      this.finished.emit(e);
    });
  }
}
