import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { intersection, isEmpty, values } from 'lodash';
import * as fromCore from '../../+state/actions/core-state.actions';
import { getLogo, getMenuItems, getShowSidenav, getTitle } from '../../+state/selectors/core-state.selectors';
import { fromAuthentication, getLoggedIn, getUser, User } from '@labdat/authentication';
import { map } from 'rxjs/operators/map';
import { routesAnimation } from '../../animations/routes.animation';
import { fromRouter } from '@labdat/common/router-state';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'core-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routesAnimation]
})
export class LayoutComponent implements OnInit {

  @ViewChild('outlet')
  public outlet;

  public logo$ = this._store.select(getLogo);
  public title$ = this._store.select(getTitle);
  public menuItems$;
  public isSidenavOpened$ = this._store.select(getShowSidenav);
  public isLoggedIn$ = this._store.select(getLoggedIn);
  public currentUser$ = this._store.select(getUser);
  public isAdmin$ = this.currentUser$.pipe(
    map((user: User) => (user) ? user.roles.includes('admin') : false)
  );

  constructor(private _store: Store<any>) { }

  ngOnInit(): void {
    const items$ = this._store.select(getMenuItems);
    const user$ = this._store.select(getUser);
    this.menuItems$ = items$.pipe(
      combineLatest(
        user$,
        (items, user) =>
          values(items)
          .filter(item => isEmpty(item.roles) || (user && intersection(item.roles, user.roles).length > 0))
          .filter(item => !isEmpty(item))
      )
    );
  }

  public openSidenav(): void {
    this._store.dispatch(new fromCore.OpenSidenav());
  }

  public closeSidenav(): void {
    this._store.dispatch(new fromCore.CloseSidenav());
  }

  public editProfile(): void {
    this._store.dispatch(new fromRouter.Go({
      path: [{ outlets: { profile: 'profile' } }]
    }));
  }

  public userManagement(): void {
    this._store.dispatch(new fromRouter.Go({ path: ['users'] }));
  }

  public goToAuthenticationPage(): void {
    this._store.dispatch(new fromRouter.Go({ path: ['auth'] }));
  }

  public goTo(link: string): void {
    this._store.dispatch(new fromRouter.Go({ path: [link] }));
  }

  public logout(): void {
    this._store.dispatch(new fromAuthentication.RemoteLogout());
  }

  public trackByOrder(item: MenuItem): number {
    return item.order;
  }
}
