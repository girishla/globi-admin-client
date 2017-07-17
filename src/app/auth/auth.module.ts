import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';


const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent
    // canActivate: [NoAuthGuard]
  }
]);

@NgModule({
  imports: [
  ],
  declarations: [
    AuthComponent
  ],

  providers: [
    NoAuthGuard
  ]
})
export class AuthModule {}