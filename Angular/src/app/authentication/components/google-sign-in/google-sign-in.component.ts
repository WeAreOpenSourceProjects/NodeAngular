import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'auth-google',
  template: `
    <button class="customGPlusSignIn" mat-button (click)="signIn()">
      <mat-icon svgIcon="google"></mat-icon>&nbsp;<span i18n="@@googleLogin">Login with Google</span>
    </button>`,
  styles: [':host { display: flex; justify-content: center; }', 'button { flex-grow: 1; }']
})
export class GoogleSignInComponent {

  @Output()
  public login = new EventEmitter();

  signIn(): void {
    this.login.emit();
  }
}
