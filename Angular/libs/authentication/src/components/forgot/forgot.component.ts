import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first, keys } from 'lodash';

@Component({
  selector: 'auth-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent {

  @Input()
  public errorMessage: string | null;

  @Output()
  public changePasswordRequest = new EventEmitter<string>();

  public forgotPassword = false;

  public forgotControl = this._formBuilder.control('', [
    Validators.required,
    Validators.email
  ]);

  get forgotError(): string {
    return first(keys(this.forgotControl.errors)) || '';
  }

  constructor(private _formBuilder: FormBuilder) { }

  public onForgotPasswordSubmit(email: string): void {
    this.forgotPassword = false;
    this.changePasswordRequest.emit(email);
  }
}
