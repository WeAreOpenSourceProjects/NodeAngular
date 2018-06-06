import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';

import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
import { debounceTime } from 'rxjs/operators/debounceTime';

import { fromConnectForm } from '@waos/common/connect-form-state';
import { ConnectFormStateSelectors } from '@waos/common/connect-form-state/src/+state/selectors/connect-form-state.selectors';

@Directive({
  selector: '[connectForm]'
})
export class ConnectFormDirective implements OnInit, OnDestroy {

  @Input('connectForm')
  path: string;

  @Input()
  debounce = 300;

  @Output()
  error = new EventEmitter();

  @Output()
  success = new EventEmitter();

  public formChange: Subscription;
  public formSuccess: Subscription;
  public formError: Subscription;

  constructor(private formGroupDirective: FormGroupDirective, private actions$: Actions, private store: Store<any>) {}

  ngOnInit(): void {
    const initConnectForm$ = this.store.select(ConnectFormStateSelectors[`${this.path}Selector`]);

    initConnectForm$
    .take(1)
    .subscribe(val => this.formGroupDirective.form.patchValue(val));

    this.formChange = this.formGroupDirective.form.valueChanges.pipe(debounceTime(this.debounce))
    .subscribe(value => {
      this.store.dispatch(new fromConnectForm.UpdateForm({ value, path: this.path }));
    });

    this.formSuccess = this.actions$
      .ofType(fromConnectForm.FORM_SUBMIT_SUCCESS)
      .pipe(
        map((action: any) => action.payload),
        filter(payload => payload.path === this.path))
      .subscribe(() => {
        this.formGroupDirective.form.reset();
        this.success.emit();
      });

    this.formError = this.actions$
      .ofType(fromConnectForm.FORM_SUBMIT_ERROR)
      .pipe(
        map((action: any) => action.payload),
        filter(payload => payload.path === this.path)
      )
      .subscribe(payload => this.error.emit(payload.error));
  }

  ngOnDestroy(): void {
    this.formChange.unsubscribe();
    this.formError.unsubscribe();
    this.formSuccess.unsubscribe();
  }
}
