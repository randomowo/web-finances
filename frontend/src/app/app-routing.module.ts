import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {CheckAuthGuard} from './session.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/finances/finances.module').then(m => m.FinancesModule),
    canActivate: [CheckAuthGuard]
  },
  {
    path: 'finances',
    redirectTo: '/'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [CheckAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
