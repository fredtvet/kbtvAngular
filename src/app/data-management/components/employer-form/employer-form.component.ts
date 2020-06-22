import {
  Component,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Employer } from 'src/app/core/models';
import { Roles } from "src/app/shared-app/enums";
import { EmployerService, NotificationService } from "src/app/core/services";
import { Observable } from "rxjs";

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
    private employerService: EmployerService,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    if (!this.employerIdPreset) this.isCreateForm = true;
    else this.employer$ = this.employerService.get$(this.employerIdPreset);
  }

  onSubmit(result: Employer): void {
    if (!result) this.finished.emit();
    else if (!this.isCreateForm) this.updateEmployer(result);
    else this.createEmployer(result);
  }

  private updateEmployer(employer: Employer): void {
    this.employerService.update$(employer).subscribe((e) => {
      this.notificationService.setNotification("Vellykket oppdatering!");
      this.finished.emit(e);
    });
  }

  private createEmployer(employer: any): void {
    this.employerService.add$(employer).subscribe((e) => {
      this.notificationService.setNotification(
        "Vellykket! Ny oppdragsgiver registrert."
      );
      this.finished.emit(e);
    });
  }
}
