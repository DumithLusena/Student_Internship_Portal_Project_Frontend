import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserRole } from '../model/user';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'] as UserRole;
    
    if (this.authService.hasRole(expectedRole)) {
      return true;
    }
    
    this.router.navigate(['/unauthorized']);
    return false;
  }
}