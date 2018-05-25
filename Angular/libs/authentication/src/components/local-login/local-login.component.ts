import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first, keys } from 'lodash';

@Component({
  selector: 'auth-local',
  templateUrl: './local-login.component.html',
  styleUrls: ['./local-login.component.scss']
})
export class LocalLoginComponent {

  @Input('isPending')
  set pending(isPending: boolean) {
    (isPending)
    ? this.loginForm.disable()
    : this.loginForm.enable();
  }

  @Input()
  public errorMessage: string | null;

  @Output()
  public login = new EventEmitter();

  public hide = true;

  public loginForm = this._formBuilder.group({
    email: this._formBuilder.control('', [Validators.required, Validators.email]),
    password: this._formBuilder.control('', [Validators.required])
  });

  get visibility(): string {
    return this.hide ? 'action:ic_visibility_off_24px' : 'action:ic_visibility_24px';
  }

  get emailError(): string {
    return first(
      keys(
        this.loginForm
        .get('email').errors
      )
    ) || '';
  }

  get passwordError(): string {
    return first(keys(this.loginForm.get('password').errors)) || '';
  }

  constructor(private _formBuilder: FormBuilder) { }

  public onLoginSubmit(): void {
    this.login.emit(this.loginForm.value);
  }
}
