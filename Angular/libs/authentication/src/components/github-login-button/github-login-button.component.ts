import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output } from '@angular/core';

declare var hello;

@Component({
  selector: 'github-login-button',
  template: `
    <button mat-button (click)="login()">
      <mat-icon svgIcon="github"></mat-icon>
      <span>Login with Github</span>
    </button>`,
  styles: [':host { display: block; }']
})
export class GithubLoginButtonComponent implements AfterViewInit {

  @Input()
  public clientId: string;

  @Output()
  public twitterLoginSuccess = new EventEmitter();

  @Output()
  public twitterLoginFailure = new EventEmitter();

  ngAfterViewInit(): void {

    hello.init({
      github: this.clientId
    }, {
      redirect_uri : '../redirect.html'
    });

  }

  login(): void {
    hello('github')
    .login({
      scope: 'user'
    });
  }
}
