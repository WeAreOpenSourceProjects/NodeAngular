import { Injectable } from '@angular/core';
import { environment } from '@waos/common/environments';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';

declare const Msal;

@Injectable()
export class MsalService {

  private _userAgentApplication: any;

  constructor() {
    this._userAgentApplication = new Msal.UserAgentApplication(
      environment.authentication.providers.microsoft.clientId,
      undefined,
      undefined,
      {
        redirectUri: environment.authentication.providers.microsoft.redirectUri
      });
  }

  signIn(): Observable<any> {
    return fromPromise(this._userAgentApplication.loginPopup([environment.authentication.providers.microsoft.scopes]));
  }

  signOut(): Observable<any> {
    return this._userAgentApplication.logout();
  }
}
