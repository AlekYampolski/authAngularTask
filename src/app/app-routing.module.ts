import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { AuthGuard } from './_guard/auth.guard';
import { BootGuard } from './_guard/boot.guard';
import { HomeGuard } from './_guard/home.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import {  HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, canActivate: [BootGuard] },
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
