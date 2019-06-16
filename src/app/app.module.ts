import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AuthGuard } from './_guard/auth.guard';
import { HomeGuard } from './_guard/home.guard';
import { AuthfbService} from './_services/authfb.service';
import { UserService} from './_services/user.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { environment } from '../environments/environment';
import { BootGuard } from './_guard/boot.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFontAwesomeModule
  ],
  providers: [AuthfbService, UserService, AuthGuard, BootGuard, HomeGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
