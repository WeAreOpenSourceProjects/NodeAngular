import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first, keys } from 'lodash';
import { environment } from '@labdat/common/environments';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy, OnInit {

  @Input('isPending')
  set pending(isPending: boolean) {
    if (isPending) {
      this.loginForm.disable();
    } else {
      this.loginForm.enable();
    }
  }

  @Input()
  public errorMessage: string | null;

  public googleClientId = environment.authentication.providers.google.clientid;
  public microsoftClientId = environment.authentication.providers.microsoft.clientid;
  public microsoftRedirectUri = environment.authentication.providers.microsoft.redirecturi;
  public microsoftGrapApiScopes = environment.authentication.providers.microsoft.scopes;

  @Output()
  public login = new EventEmitter();

  @Output()
  public email = new EventEmitter<string>();

  public forgotPassword = false;

  public hide = true;
  public loginForm = this._formBuilder.group({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.control('', [Validators.required])
  });

  public forgotControl = this._formBuilder.control('', [
    Validators.required,
    Validators.email
  ]);

  get visibility(): string {
    return this.hide ? 'action:ic_visibility_off_24px' : 'action:ic_visibility_24px';
  }

  get emailError(): string {
    return first(keys(this.loginForm.get('email').errors)) || '';
  }

  get forgotError(): string {
    return first(keys(this.forgotControl.errors)) || '';
  }

  get passwordError(): string {
    return first(keys(this.loginForm.get('password').errors)) || '';
  }

  constructor(
    private _formBuilder: FormBuilder
  ) {
  }

  public onLoginSubmit(): void {
    this.login.emit(this.loginForm.value);
  }

  public onForgotPasswordSubmit(email: string): void {
    this.email.emit(email);
    this.forgotPassword = false;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onGoogleSignInSuccess(idToken: any): void {
    this.login.emit({ idToken, provider: 'google' });
  }

  onMSSignInSuccess({ idToken, user }): void {
    this.login.emit({ idToken, user, provider: 'microsoft' });
  }
}
