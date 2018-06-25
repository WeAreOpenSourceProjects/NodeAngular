import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { from as fromPromise, Observable } from 'rxjs';
import { get } from 'lodash';

declare const Msal;

@Injectable()
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

      console.log(
        get(environment, ['authentication', 'providers', 'microsoft', 'clientId']),
        get(environment, ['authentication', 'providers', 'microsoft', 'redirectUri']),
        get(environment, ['authentication', 'providers', 'microsoft', 'scopes'])
      );
  }

  signIn(): Observable<any> {
    return fromPromise(this._userAgentApplication.loginPopup([get(environment, ['authentication', 'providers', 'microsoft', 'scopes'])]));
  }

  signOut(): Observable<any> {
    return this._userAgentApplication.logout();
  }
}
