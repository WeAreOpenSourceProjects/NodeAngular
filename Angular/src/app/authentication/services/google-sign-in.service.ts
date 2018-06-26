import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from as fromPromise, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { get } from 'lodash';
import { AuthenticationStateModule } from '../authentication-state.module';

declare const gapi;

@Injectable({
  providedIn: AuthenticationStateModule
})
export class GoogleSignInService {

  constructor() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: get(environment, ['authentication', 'providers', 'google', 'clientId']),
        fetch_basic_profile: true
      });
    });
  }

  signIn(): Observable<any> {
    return fromPromise(gapi.auth2
      .getAuthInstance()
      .signIn({
        prompt: 'consent',
        ux_mode: 'popup'
      })
    )
    .pipe(map((googleUser: any) => googleUser.getAuthResponse().id_token));
  }

  signOut(): Observable<any> {
    gapi.auth2
    .getAuthInstance()
    .disconnect();

    return fromPromise(gapi.auth2
      .getAuthInstance()
      .signOut()
    );
  }
}
