import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from './auth.service';

export const sessionResolver: ResolveFn<boolean> = () => {
  const auth = inject(AuthService);
  const restore$ = auth.restoreSession();

  if (!restore$) {
    return true;
  }

  return restore$.pipe(
    map(() => true),
    catchError(() => {
      auth.clearSession();
      return of(true);
    })
  );
};
