import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, mapToCanActivate } from '@angular/router';
import { Inject, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard = () =>{
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  // redirect to the login page
  return router.parseUrl('/login');

}