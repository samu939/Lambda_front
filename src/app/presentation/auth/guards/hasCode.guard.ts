import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../../../core/user/domain/interfaces/auth-status.enum';
import { enviroment } from '../../../../environments/environment';
import { LocalStorage } from '../services/LocalStorage';

export const hasCodeGuard: CanActivateFn = (route, state) => {

  const authService=inject(AuthService)

  const router = inject(Router);
  // if (!enviroment.production) {
  //   return true
  // }

  if(authService._hasCode) {
   return true}
  else{
    router.navigateByUrl('/auth/resetpassword')
    return false;
  }
};
