import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Credentials } from '../../models/authenticate.model';
import { ConfirmValidParentMatcher, CustomValidators } from './password-match.validator';
import { first, keys } from 'lodash';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public confirmValidParentMatcher = new ConfirmValidParentMatcher();
  public hide = true;
  public registerForm = this.formBuilder.group({
    firstName: this.formBuilder.control('', [Validators.required]),
    lastName: this.formBuilder.control('', [Validators.required]),
    emailGroup: this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      confirmEmail: this.formBuilder.control('', Validators.required)
    }, { validator: CustomValidators.childrenEqual }),
    passwordGroup: this.formBuilder.group({
      password: this.formBuilder.control('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.formBuilder.control('', Validators.required)
    }, { validator: CustomValidators.childrenEqual })
  });

  @Output()
  public register = new EventEmitter<Credentials>();

  constructor(private formBuilder: FormBuilder) { }

  get visibility(): string {
    return this.hide ? 'action:ic_visibility_off_24px' : 'action:ic_visibility_24px';
  }

  get firstNameError(): string {
    return first(
      keys(
        this.registerForm.get('firstName').errors
      )
    ) || '';
  }

  get lastNameError(): string {
    return first(
      keys(
        this.registerForm.get('lastName').errors
      )
    ) || '';
  }

  get emailError(): string {
    return first(
      keys(
        this.registerForm
        .get('emailGroup')
        .get('email').errors
      )
    ) || '';
  }

  get confirmEmailError(): string {
    return first(
      keys(
        this.registerForm
        .get('emailGroup').errors
      )
    ) || '';
  }

  get passwordError(): string {
    return first(
      keys(
        this.registerForm
        .get('passwordGroup')
        .get('password').errors
      )
    ) || '';
  }

  get confirmPasswordError(): string {
    return first(
      keys(
        this.registerForm
        .get('passwordGroup').errors
      )
    ) || '';
  }

  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(() => ({}));
  }

  onSubmit(): void {
    const {
      firstName,
      lastName, userName,
      emailGroup,
      passwordGroup
    } = this.registerForm.value;

    const userInfos = {
      firstName,
      lastName,
      userName,
      email: emailGroup.email,
      password: passwordGroup.password
    };

    this.register.emit(userInfos);
  }
}
