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
    <button class="customGPlusSignIn" mat-button (click)="signIn()">
      <mat-icon svgIcon="google"></mat-icon>
      <span>Login with Google</span>
    </button>`
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

  private auth2: any;

  @Output()
  public signInSuccess = new EventEmitter();

  @Output()
  public signInFailure = new EventEmitter();

  ngAfterViewInit(): void {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        fetch_basic_profile: true
      });
    });
  }

  signIn(): void {
    this.auth2.signIn()
    .then((googleUser: any) => {
      const idToken = googleUser.getAuthResponse().id_token;
      this.signInSuccess.emit(idToken);
    });
  }

}
