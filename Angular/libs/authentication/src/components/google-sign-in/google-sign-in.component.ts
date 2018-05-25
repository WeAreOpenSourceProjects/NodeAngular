import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'auth-google',
  template: `
    <button class="customGPlusSignIn" mat-button (click)="signIn()">
      <mat-icon svgIcon="google"></mat-icon>
      <span>Login with Google</span>
    </button>`
})
export class GoogleSignInComponent {

  @Output()
  public login = new EventEmitter();

  signIn(): void {
    this.login.emit();
  }
}
