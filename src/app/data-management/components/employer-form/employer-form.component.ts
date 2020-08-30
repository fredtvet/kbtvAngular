import {
  ChangeDetectionStrategy, Component,

  EventEmitter, Input,

  Output
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable, of } from "rxjs";
import { Employer } from 'src/app/core/models';
import { Roles } from "src/app/shared-app/enums";
import { DataManagementStore } from '../../data-management.store';
import { EmployerFormConfig } from '../../interfaces/employer-form-config.interface';
import { FormAction } from 'src/app/shared/enums';
import { NotificationService, NotificationType } from 'src/app/core/services/notification';

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
  @Input() config: EmployerFormConfig;
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
    if (!this.config.employerId) this.isCreateForm = true;
    else this.employer$ = of(null); //placeholder
  }

  onSubmit(result: Employer): void {
    if (!result) this.finished.emit();
    else if (!this.isCreateForm) this.updateEmployer(result);
    else this.createEmployer(result);
  }

  private updateEmployer(employer: Employer): void {
    this.store.update$(employer).subscribe((e) => {
      this.notificationService.notify({title: "Vellykket oppdatering!", type: NotificationType.Success});
      this.finished.emit(FormAction.Update);
    });
  }

  private createEmployer(employer: any): void {
    this.store.add$(employer).subscribe((e) => {
      this.notificationService.notify({title: "Vellykket! Ny oppdragsgiver registrert.", type: NotificationType.Success});
      this.finished.emit(FormAction.Create);
    });
  }
}
