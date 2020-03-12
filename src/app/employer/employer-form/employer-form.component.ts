import { Component } from '@angular/core';
import { MatDialog} from '@angular/material';
import { Employer } from 'src/app/shared/models';
import { Roles } from '../../shared/enums';
import { EmployerService, NotificationService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MainNavConfig } from 'src/app/shared/layout';
import { takeUntil } from 'rxjs/operators';
import { VertMenuParent, ConfirmDeleteDialogComponent, NavAction } from 'src/app/shared/components';

@Component({
  selector: 'app-employer-form',
  templateUrl: './employer-form.component.html'
})

export class EmployerFormComponent extends VertMenuParent {
  Roles = Roles;

  googleOptions = {
    types: ['geocode'],
    componentRestrictions: { country: "no" }
  }

  mainNavConfig: MainNavConfig = new MainNavConfig;

  employer: Employer = new Employer();

  isCreateForm: boolean = false;

  constructor(
    private employerService: EmployerService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ){super();}

    ngOnInit(){
      this.employer.id = +this.route.snapshot.paramMap.get('id');

      if(!this.employer.id) this.isCreateForm = true;
      else this.employerService.get$(this.employer.id)
              .pipe(takeUntil(this.unsubscribe))
              .subscribe(result => this.employer = result);

      this.configureMainNav();
    }

    onSubmit(result: Employer){
      if(!result) this.onBack();
      else if(!this.isCreateForm) this.updateEmployer(result);
      else this.createEmployer(result);
    }

    private openDeleteDialog = (e: string) => {
      const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
      deleteDialogRef.afterClosed().subscribe(res => {
          if(res) this.deleteEmployer();
      });
    }

    private deleteEmployer(){
      this.employerService.delete$(this.employer.id)
        .subscribe(data => {
          this.notificationService.setNotification('Vellykket! Oppdragsgiver slettet.');
          this.onBack();
        });
    }

    updateEmployer(employer: Employer){
      this.employerService.update$(employer)
        .subscribe(data => {
          this.notificationService.setNotification('Vellykket oppdatering!');
          this.onBack();
        });
    }

    createEmployer(employer: any){
      this.employerService.add$(employer)
        .subscribe(data => {
          this.notificationService.setNotification('Vellykket! Ny oppdragsgiver registrert.');
          this.onBack();
        });
    }

    configureMainNav(){
      if(!this.isCreateForm){
        this.vertActions = [new NavAction("Slett", "delete_forever", "delete", this.openDeleteDialog, [Roles.Leder])];
        this.mainNavConfig.vertActions = this.vertActions;
      }
      this.mainNavConfig.title = this.isCreateForm ? 'Ny' : 'Rediger';
      this.mainNavConfig.title+= ' oppdragsgiver';
      this.mainNavConfig.menuBtnEnabled = false;
    }

    onBack(): void {
      let returnRoute: string = this.route.snapshot.params['returnRoute'];

      if(returnRoute != undefined) this.router.navigate([returnRoute])
      else this.router.navigate(['oppdragsgivere'])
    }


}
