import { Store } from '@ngrx/store';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, EMPTY as empty, throwError as _throw } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationState } from '../+state/states/authentication-state.state';
import * as fromAuthentication from '../+state/actions/authentication-state.actions';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor(private store: Store<AuthenticationState>) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (request.url.match(/(?!\api\/)/)) {
      const nextRequest = request.clone({ withCredentials: true });
      return next.handle(nextRequest);
    }

    const tokenExpiresIn = Number(localStorage.getItem('tokenExpiresIn'));
    if (tokenExpiresIn && tokenExpiresIn < Date.now()) {
      this.store.dispatch(new fromAuthentication.RemoteLogout('Token expired'));
      return empty;
    }
    return next.handle(request)
    .pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 403 && !error.url.includes('/auth')) {
          this.store.dispatch(new fromAuthentication.RemoteLogout('Unauthorized Operation'));
          return empty;
        }
        return _throw(error);
      })
    );
  }
}
