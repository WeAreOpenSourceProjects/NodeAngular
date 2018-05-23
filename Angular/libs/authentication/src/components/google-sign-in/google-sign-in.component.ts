import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'google-signin',
  template: `
  <div id="gSignInWrapper">
    <button #signInButton class="customGPlusSignIn" mat-button>
      <mat-icon svgIcon="google"></mat-icon>
      <span>Login with Google</span>
    </button>
    </div>`
})
export class GoogleSignInComponent implements AfterViewInit {

  @ViewChild('signInButton', { read: ElementRef })
  public signInButton;

  @Input()
  public scope: string;

  private _longTitle: boolean;

  get longTitle(): string {
    return this._longTitle.toString();
  }

  @Input()
  set longTitle(value: string) {
    this._longTitle = Boolean(value);
  }

  @Input()
  public clientId: string;

  @Input()
  public cookiePolicy: string;

  private _fetchBasicProfile: boolean;

  get fetchBasicProfile(): string {
    return this._fetchBasicProfile.toString();
  }

  @Input()
  set fetchBasicProfile(s: string) {
    this._fetchBasicProfile = Boolean(s);
  }

  @Input()
  public hostedDomain: string;

  @Output()
  public signInSuccess = new EventEmitter();

  @Output()
  public signInFailure = new EventEmitter();

  ngAfterViewInit(): void {
    gapi.load('auth2', () => {
      const oauth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookie_policy: this.cookiePolicy,
        fetch_basic_profile: this._fetchBasicProfile,
        hosted_domain: this.hostedDomain
      });
      oauth2.attachClickHandler(
        this.signInButton.nativeElement,
        {},
        (googleUser: any) => {
          const idToken = googleUser.getAuthResponse().id_token;
          this.signInSuccess.emit(idToken);
        },
        undefined);
    });
  }
}
