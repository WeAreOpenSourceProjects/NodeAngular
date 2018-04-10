import { Component, OnInit } from '@angular/core';
import * as fromAuthentication from '../../+state/actions/authentication-state.actions';
import { getUser } from '../../+state/selectors/authentication-state.selectors';
import { AuthenticationState } from '../../+state/states/authentication-state.state';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators/first';
import { User } from '../../models/user.model';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { Subject } from 'rxjs/Subject';
import { fromRouter } from '@labdat/common/router-state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user$ = this.store.select(getUser);
  public onSubmit$ = new Subject();
  public goBack$ = new Subject();

  constructor(private store: Store<AuthenticationState>, private formBuilder: FormBuilder) {}

  public profileForm: FormGroup;

  ngOnInit(): void {

    this.onSubmit$
    .pipe(
      withLatestFrom(this.user$, (_x, user) => user)
    )
    .subscribe(user => {
      const toUpdate = this.profileForm.value;
      this.store.dispatch(new fromAuthentication.UpdateUser({ user: { id: user.id, ...toUpdate }}));
    });

    this.user$
    .pipe(first())
    .subscribe((user: User) => {
      this.profileForm = this.formBuilder.group({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email
      });
    });

    this.goBack$
    .subscribe(_x => this.store.dispatch(new fromRouter.Back()));
  }
}
