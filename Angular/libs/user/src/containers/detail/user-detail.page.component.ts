import { Component } from '@angular/core';
import { selectSelectedUser } from '../../+state/user.selectors';
import { UserState } from '../../+state/user.interfaces';
import { Store } from '@ngrx/store';

@Component({
  selector: 'user-detail-page',
  templateUrl: './user-detail.page.component.html',
  styleUrls: ['./user-detail.page.component.scss']
})
export class UserDetailPageComponent {

  public currentUser$ = this._store.select(selectSelectedUser);

  constructor(private _store: Store<UserState>) { }
}
