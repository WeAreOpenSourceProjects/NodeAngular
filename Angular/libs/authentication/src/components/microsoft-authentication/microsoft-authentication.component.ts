import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output} from '@angular/core';

declare var Msal;

@Component({
  selector: 'microsoft-authentication',
  template: `
    <button mat-button (click)="authenticate()">
      <mat-icon svgIcon="windows"></mat-icon>
      <span>Login with Windows</span>
    </button>`,
  styles: [':host { display: block; }']
})
export class MicrosoftAuthenticationComponent implements AfterViewInit {

  @Input()
  public clientID: string;

  @Input()
  public redirectUri: string;

  @Input()
  public grapApiScopes;

  @Output()
  public signInSuccess = new EventEmitter();

  @Output()
  public signInFailure = new EventEmitter();

  private _userAgentApplication: any;

  ngAfterViewInit(): void {
    this._userAgentApplication = new Msal.UserAgentApplication(this.clientID, undefined, undefined, {
      redirectUri: this.redirectUri
    });
  }

  authenticate(): void {
    this._userAgentApplication.loginPopup([this.grapApiScopes])
    .then((idToken: any) => {
      const user = this._userAgentApplication.getUser();
      this.signInSuccess.emit({ idToken, user });
    })
    .catch((_error: any) => {});
//      .then(() => this._userAgentApplication.acquireTokenSilent(this.graphAPIScopes))
//      .catch((_error: any) => this._userAgentApplication.acquireTokenPopup(this.graphAPIScopes))
//      .then((accessToken: any) => {
//        console.log('accessToken: ', accessToken);

//        return accessToken;
//      })
//      .then((accessToken: any) => this.callWebApiWithToken(this.graphApiEndpoint, accessToken))
//      .then(data => console.log('data', data))
//      .catch((error: any) => console.error(error));
//    } else {
//      this._userAgentApplication.acquireTokenSilent(this.graphAPIScopes)
//      .then((token: any) => this.callWebApiWithToken(this.graphApiEndpoint, token))
//      .catch((_error: any) => this._userAgentApplication.acquireTokenRedirect(this.graphAPIScopes));
  }

/*
  callWebApiWithToken(endpoint, token): Promise<any> {
    const headers = new Headers();
    const bearer = `Bearer ${token}`;
    headers.append('Authorization', bearer);
    const options = {
      headers,
      method: 'GET'
    };

    return fetch(endpoint, options)
      .then((response: any) => {
        const contentType = response.headers.get('content-type');
        if (response.status === 200 && contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        }

        return response.json()
          .then((data: any) => console.error(endpoint, data, undefined));
      })
      .catch ((error: any) => console.error(endpoint, error, undefined));
  }

  signOut(): void {
    this._userAgentApplication.logout();
  }
*/
}
