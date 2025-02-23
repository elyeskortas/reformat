import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidatListComponent } from './candidat-list/candidat-list.component';
import { ElecteurListComponent } from './electeur-list/electeur-list.component';
import { ElectionListComponent } from './election-list/election-list.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminListComponent } from './admin-list/admin-list.component';
import { EventCreateComponent } from './event-create/event-create.component'; // Import the component
import { ResultatListComponent } from './resultat-list/resultat-list.component';
import { VoteListComponent } from './vote-list/vote-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NotificationComponent } from './notification/notification.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserManagementComponent } from './user-management/user-management.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidatListComponent,
    ElecteurListComponent,
    ElectionListComponent,
    LoginComponent,
    ForgotPasswordComponent,
    AdminListComponent,
    EventCreateComponent, // Declare the component
    ResultatListComponent,
    VoteListComponent,
    DashboardComponent,
    NotificationComponent,
    UserListComponent,
    UserDetailComponent,
    UserAddComponent,
    UserEditComponent,
    UserManagementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
