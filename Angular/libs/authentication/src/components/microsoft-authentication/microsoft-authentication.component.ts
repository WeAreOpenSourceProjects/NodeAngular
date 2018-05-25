import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'auth-microsoft',
  template: `
    <button mat-button (click)="signIn()">
      <mat-icon svgIcon="windows"></mat-icon>
      <span>Login with Windows</span>
    </button>`,
  styles: [':host { display: block; }']
})
export class MicrosoftAuthenticationComponent {

  @Output()
  public login = new EventEmitter();

  signIn(): void {
    this.login.emit();
  }
}
