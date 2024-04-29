import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { CustomerSaveComponent } from './component/customer-save/customer-save.component';
import { LoginComponent } from './component/auth/login/login.component';
import { CustomerEditComponent } from './component/customer-edit/customer-edit.component';
import { ForgotPasswordComponent } from './component/auth/forgot-password/forgot-password.component';

const routes: Routes = [
  {path:'customer-list', component:CustomerListComponent},
  {path:'customer-save', component:CustomerSaveComponent},
  {path:'login',component:LoginComponent},
  {path:'customer-edit/:custId',component:CustomerEditComponent},
  {path:'forgot-password',component:ForgotPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
