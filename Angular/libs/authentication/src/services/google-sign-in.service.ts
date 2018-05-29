import { Injectable } from '@angular/core';
import { environment } from '@labdat/common/environments';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
declare const gapi;

@Injectable()
export class GoogleSignInService {

  constructor() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: environment.authentication.providers.google.clientid,
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
