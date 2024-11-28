import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './registre/registre.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
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


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    DashbordaComponent,
    DashComponent,
    ListComponent,
    ClasselistComponent,
    EmploiComponent,
    PasswordComponent,
    DashboardsComponent,
    EmploiforstudentComponent,
    Password2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
