import { Component } from '@angular/core';
import { MatDialog, MatBottomSheet} from '@angular/material';
import { Employer } from 'src/app/shared/models';
import { Roles } from '../../shared/enums';
import { EmployerService, NotificationService, BottomSheetActionHubService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MainNavConfig, BottomSheetParent } from 'src/app/shared/layout';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDeleteDialogComponent, NavAction } from 'src/app/shared/components';

@Component({
  selector: 'app-employer-form',
  templateUrl: './employer-form.component.html'
})

export class EmployerFormComponent extends BottomSheetParent {
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
    public dialog: MatDialog,
    _bottomSheet: MatBottomSheet,
    bottomSheetActionHub: BottomSheetActionHubService,
  ){ super(bottomSheetActionHub, _bottomSheet); }

    ngOnInit(){
      super.ngOnInit();
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
        this.bottomSheetActions = [new NavAction("Slett", "delete_forever", "delete", this.openDeleteDialog, [Roles.Leder])];
        this.mainNavConfig.bottomSheetBtnEnabled = true;
        this.mainNavConfig.bottomSheetActions = this.bottomSheetActions;
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
