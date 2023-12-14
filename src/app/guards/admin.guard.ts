import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

export const AdminGuard: CanActivateFn = (route, state) => {

  const userService = inject(UsuarioService);
  const router = inject(Router);

  return (userService.role === 'ADMIN_ROLE') ? true : router.navigateByUrl('dashboard');
};
