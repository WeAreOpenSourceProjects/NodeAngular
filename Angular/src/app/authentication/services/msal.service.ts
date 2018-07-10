import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from as fromPromise, Observable } from 'rxjs';
import { get } from 'lodash';
import { AuthenticationStateModule } from '../authentication-state.module';

declare const Msal;

@Injectable({
  providedIn: AuthenticationStateModule
})
export class MsalService {

  private _userAgentApplication: any;

  constructor() {
    this._userAgentApplication = new Msal.UserAgentApplication(
      get(environment, ['authentication', 'providers', 'microsoft', 'clientId']),
      undefined,
      undefined,
      {
        redirectUri: get(environment, ['authentication', 'providers', 'microsoft', 'redirectUri'])
      });
  }

  signIn(): Observable<any> {
    return fromPromise(this._userAgentApplication.loginPopup([get(environment, ['authentication', 'providers', 'microsoft', 'scopes'])]));
  }

  signOut(): Observable<any> {
    return this._userAgentApplication.logout();
  }
}
