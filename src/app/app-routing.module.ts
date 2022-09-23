import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PensionerDetailsComponent } from './pensioner-details/pensioner-details.component';
import { HomeComponent } from './home/home.component';
import { ProcessPensionComponent } from './process-pension/process-pension.component';
import { AuthGuard } from './auth/auth.gaurd';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'pensioner-details', component: PensionerDetailsComponent,canActivate:[AuthGuard], },
  { path: 'process-pension', component: ProcessPensionComponent, canActivate:[AuthGuard], }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
