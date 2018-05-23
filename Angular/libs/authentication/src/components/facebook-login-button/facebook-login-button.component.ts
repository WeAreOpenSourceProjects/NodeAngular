import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output } from '@angular/core';

declare var FB;

@Component({
  selector: 'facebook-login-button',
  template: `
    <button mat-button (click)="login()">
      <mat-icon svgIcon="facebook"></mat-icon>
      <span>Login with Facebook</span>
    </button>`
//  styles: [':host { display: block; }'],
})
export class FacebookLoginButtonComponent implements AfterViewInit {

  // Render options
  @Input()
  public options: any;

  @Input()
  public appId: string;

  @Input()
  public cookie: boolean;

  @Input()
  public xfbml: boolean;

  @Input()
  public version: string;

  @Output()
  public facebookLoginSuccess = new EventEmitter();

  @Output()
  public facebookLoginFailure = new EventEmitter();

  ngAfterViewInit(): void {
  }

  login(): void {
    FB.init({
      appId: this.appId,
      cookie: this.cookie,
      xfbml: this.xfbml,
      version: this.version
    });

//    FB.AppEvents.logPageView();

    FB.login((response: any) => {
      if (response.authResponse) {
        console.log(response.authResponse);
      }
    }, this.options);
  }
}
