import { Component } from '@angular/core';
import { MatDialog} from '@angular/material';
import { Employer } from 'src/app/shared/models';
import { Roles } from '../../shared/enums';
import { EmployerService, NotificationService, MainNavService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDeleteDialogComponent } from 'src/app/shared/components';
import { SubscriptionComponent } from 'src/app/shared/components/abstracts/subscription.component';

@Component({
  selector: 'app-employer-form',
  templateUrl: './employer-form.component.html'
})

export class EmployerFormComponent extends SubscriptionComponent {
  Roles = Roles;

  googleOptions = {
    types: ['geocode'],
    componentRestrictions: { country: "no" }
  }

  employer: Employer = new Employer();

  isCreateForm: boolean = false;

  constructor(
    private mainNavService: MainNavService,
    private employerService: EmployerService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ){ 
    super();       
    this.configureMainNav();
  }

    ngOnInit(){

      this.initalizeForm();
    }

    onSubmit(result: Employer): void{
      if(!result) this.onBack();
      else if(!this.isCreateForm) this.updateEmployer(result);
      else this.createEmployer(result);
    }

    private updateEmployer(employer: Employer): void{
      this.employerService.update$(employer)
        .subscribe(data => {
          this.notificationService.setNotification('Vellykket oppdatering!');
          this.onBack();
        });
    }

    private createEmployer(employer: any): void{
      this.employerService.add$(employer)
        .subscribe(data => {
          this.notificationService.setNotification('Vellykket! Ny oppdragsgiver registrert.');
          this.onBack();
        });
    }

    private deleteEmployer(): void{
      this.employerService.delete$(this.employer.id)
        .subscribe(data => {
          this.notificationService.setNotification('Vellykket! Oppdragsgiver slettet.');
          this.onBack();
        });
    }

    private openDeleteDialog = (e: string) => {
      const deleteDialogRef = this.dialog.open(ConfirmDeleteDialogComponent);
      deleteDialogRef.afterClosed().subscribe(res => {
          if(res) this.deleteEmployer();
      });
    }

    private onBack = () => {
      let returnRoute: string = this.route.snapshot.params['returnRoute'];

      if(returnRoute != undefined) this.router.navigate([returnRoute])
      else this.router.navigate(['oppdragsgivere'])
    }

    private initalizeForm(): void{
      this.employer.id = +this.route.snapshot.paramMap.get('id');
      if(!this.employer.id) this.isCreateForm = true;
      else this.employerService.get$(this.employer.id)
              .pipe(takeUntil(this.unsubscribe))
              .subscribe(result => this.employer = result);  
    }

    private configureMainNav(): void{
      let cfg = this.mainNavService.getDefaultConfig();
      cfg.title = this.isCreateForm ? 'Ny oppdragsgiver' : 'Rediger oppdragsgiver';
      if(!this.isCreateForm){
        cfg.bottomSheetButtons = [
          {text:"Slett", icon:"delete_forever", callback:this.openDeleteDialog, allowedRoles:[Roles.Leder]}
        ];
      }
      cfg.backFn = this.onBack; 
      cfg.menuBtnEnabled = false;
      this.mainNavService.addConfig(cfg);
    }


}
