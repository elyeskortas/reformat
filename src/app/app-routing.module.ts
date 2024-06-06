// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CandidatListComponent } from './candidat-list/candidat-list.component';
import { ElecteurListComponent } from './electeur-list/electeur-list.component';
import { ElectionListComponent } from './election-list/election-list.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { EventCreateComponent } from './event-create/event-create.component'; // Importez le composant d'événement

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'candidats', component: CandidatListComponent, canActivate: [AuthGuard] },
  { path: 'electeurs', component: ElecteurListComponent, canActivate: [AuthGuard] },
  { path: 'elections', component: ElectionListComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminListComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'events/create', component: EventCreateComponent, canActivate: [AuthGuard] }, // Ajoutez la route pour la création d'événements
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
