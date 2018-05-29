import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'auth-microsoft',
  template: `
    <button mat-button (click)="signIn()">
      <mat-icon svgIcon="windows"></mat-icon>&nbsp;Login with Windows
    </button>`,
  styles: [':host { display: flex; justify-content: center; }', 'button { flex-grow: 1; }']
})
export class MicrosoftAuthenticationComponent {

  @Output()
  public login = new EventEmitter();

  signIn(): void {
    this.login.emit();
  }
}
