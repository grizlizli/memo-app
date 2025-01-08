import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAuthToken();
  const snackBar = inject(MatSnackBar);

  if (req.url.includes('auth')) {
    return next(req).pipe(
      catchError((error: any) => {
        snackBar.open('Error authenticating.', 'Ok');
        return throwError(() => error);
      })
    );
  }
  else {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }
};
