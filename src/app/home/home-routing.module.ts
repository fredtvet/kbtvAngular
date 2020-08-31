import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPages } from 'src/app/shared-app/enums/app-pages.enum';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {page: AppPages.Home}
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
