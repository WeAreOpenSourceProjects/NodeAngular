import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output } from '@angular/core';

declare var hello;

@Component({
  selector: 'twitter-login-button',
  template: `
    <button mat-button (click)="login()">
      <mat-icon svgIcon="twitter"></mat-icon>
      <span>Login with Twitter</span>
    </button>`,
  styles: [':host { display: block; }']
})
export class TwitterLoginButtonComponent implements AfterViewInit {

  @Input()
  public apiKey: string;

  @Input()
  public requestUrl: any;

  @Output()
  public twitterLoginSuccess = new EventEmitter();

  @Output()
  public twitterLoginFailure = new EventEmitter();

  ngAfterViewInit(): void {

    hello.init({
      twitter: this.apiKey
    }, {
      redirect_uri : '../redirect.html'
    });
  }

  login(): void {
    hello('twitter')
    .login({ response_type: 'token', scope: ['user'] });
  }
}


//.html#error=invalid_credentials&error_message=The%20client_id%20"tGp3mIPh4tJxjIp9s4jYUlqNe"%20is%20unknown.%20Register%20your%20app%20credentials%20by%20visiting%20https%2F%2Fauth-server.herokuapp.com&state=%7B"client_id"%3A"tGp3mIPh4tJxjIp9s4jYUlqNe"%2C"network"%3A"twitter"%2C"display"%3A"popup"%2C"callback"%3A"_hellojs_cfn0rxig"%2C"state"%3A""%2C"redirect_uri"%3A"http%3A%2F%2Flocalhost%3A4200%2Fredirect.html"%2C"scope"%3A"basic%2Cuser"%2C"oauth"%3A%7B"version"%3A"1.0a"%2C"auth"%3A"https%3A%2F%2Fapi.twitter.com%2Foauth%2Fauthenticate"%2C"request"%3A"https%3A%2F%2Fapi.twitter.com%2Foauth%2Frequest_token"%2C"token"%3A"https%3A%2F%2Fapi.twitter.com%2Foauth%2Faccess_token"%7D%2C"oauth_proxy"%3A"https%3A%2F%2Fauth-server.herokuapp.com%2Fproxy"%7D
