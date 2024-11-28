import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './registre/registre.component';
import { AdminComponent } from './admin/admin.component';
import { DashbordaComponent } from './dashborda/dashborda.component';
import { DashComponent } from './dash/dash.component';
import { ListComponent } from './list/list.component';
import { ClasselistComponent } from './classelist/classelist.component';
import { EmploiComponent } from './emploi/emploi.component';
import { PasswordComponent } from './password/password.component';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { EmploiforstudentComponent } from './emploiforstudent/emploiforstudent.component';
import { Password2Component } from './password2/password2.component';



const routes: Routes = [
  {path: "", component : LoginComponent},
  {path: "login", component : LoginComponent},
  {path: "registre", component : RegisterComponent},
  {path: "admin", component : AdminComponent},
  {path: "dashboard", component : DashbordaComponent},
  {path: "dash", component : DashComponent},
  {path: "list", component : ListComponent},
  {path: "classel", component : ClasselistComponent},
  {path: "emploi", component : EmploiComponent},
  {path: "password", component : PasswordComponent},
  {path: "dashboards", component : DashboardsComponent},
  {path: "emploiss", component : EmploiforstudentComponent},
  {path: "password2", component : Password2Component},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
