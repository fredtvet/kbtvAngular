import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog} from '@angular/material';
import { Employer, ConfirmDeleteDialogComponent, ROLES, VertMenuParentExtension, NavAction } from 'src/app/shared';
import { EmployersService, NotificationService } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainNavConfig } from 'src/app/shared/layout/main-nav/main-nav-config.model';

@Component({
  selector: 'app-employer-form',
  templateUrl: './employer-form.component.html'
})

export class EmployerFormComponent extends VertMenuParentExtension {
  ROLES = ROLES;

  googleOptions = {
    types: ['geocode'],
    componentRestrictions: { country: "no" }
  }

  mainNavConfig: MainNavConfig = new MainNavConfig;

  employer: Employer;

  isCreateForm: boolean = false;


  constructor(
    private employersService: EmployersService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ){ super(); }

    ngOnInit(){
      let id = this.route.snapshot.paramMap.get('id');

      if(!id) this.isCreateForm = true;
      else this.employersService.get$(+id)
              .subscribe(result => this.employer = result);

      this.configureMainNav();
    }

    onSubmit(result: Employer){
      if(!result) this.onBack();
      else if(!this.isCreateForm) this.updateEmployer(result);
      else this.createEmployer(result);
    }

    private openDeleteDialog = (e: string) => {
      console.log(e);
      const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
      deleteDialogRef.afterClosed().subscribe(res => {
          if(res) this.deleteEmployer();
      });
    }

    private deleteEmployer(){
      this.employersService.delete$(this.employer.id)
        .subscribe(data => {
          this.notificationService.setNotification('Vellykket! Oppdragsgiver slettet.');
          this.onBack();
        });
    }

    updateEmployer(employer: Employer){
      console.log(employer);
      this.employersService.update$(employer)
        .subscribe(data => {
          this.notificationService.setNotification('Vellykket oppdatering!');
          this.onBack();
        });
    }

    createEmployer(employer: any){
      this.employersService.add$(employer)
        .subscribe(data => {
          this.notificationService.setNotification('Vellykket! Ny oppdragsgiver registrert.');
          this.onBack();
        });
    }

    configureMainNav(){
      if(!this.isCreateForm){
        this.vertActions = [new NavAction("Slett", "delete_forever", "delete", this.openDeleteDialog, [ROLES.Leder])];
        this.mainNavConfig.vertActions = this.vertActions;
      }
      this.mainNavConfig.title = this.isCreateForm ? 'Ny' : 'Rediger';
      this.mainNavConfig.title+= ' oppdragsgiver';
      this.mainNavConfig.menuBtnEnabled = false;
    }

    onBack(): void {
      this.router.navigate(['oppdragsgivere'])
    }


}
