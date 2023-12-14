import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  
  const userService = inject(UsuarioService);
  const router = inject(Router);

  return userService.validarToken()
  .pipe(
    tap((isAuth) => {
      if (!isAuth) {
        router.navigateByUrl('/login');
      }
    })
  );
};
