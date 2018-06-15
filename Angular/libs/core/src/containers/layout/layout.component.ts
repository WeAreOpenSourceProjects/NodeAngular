import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators/map';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { intersection, isEmpty, values } from 'lodash';
import * as fromCore from '../../+state/actions/core-state.actions';
import { getLogo, getMenuItems, getShowSidenav, getTitle } from '../../+state/selectors/core-state.selectors';
import { fromAuthentication, getLoggedIn, getUser, User } from '@waos/authentication';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { routesAnimation } from '../../animations/routes.animation';
import { fromRouter } from '@waos/common/router-state';
import { ObservableMedia } from '@angular/flex-layout';
import { CoreSidenav } from '../../components/sidenav/sidenav';
import { MenuItem } from '../../models/menu-item.model';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/subscription';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';

@Component({
  selector: 'core-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routesAnimation]
})
export class LayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('outlet')
  public outlet;

  @ViewChild(CoreSidenav)
  public sidenav;

  public logo$ = this._store.select(getLogo);
  public title$ = this._store.select(getTitle);
  public menuItems$;
  public isSidenavOpened$ = this._store.select(getShowSidenav);
  public isLoggedIn$ = this._store.select(getLoggedIn);
  public currentUser$ = this._store.select(getUser);
  public isAdmin$ = this.currentUser$.pipe(
    map((user: User) => (user) ? user.roles.includes('admin') : false)
  );

  public mode$ = this.media
  .asObservable()
  .pipe(map(media => (media.mqAlias === 'xs') ? 'over' : 'side'));

  public widths$ = this.media
  .asObservable()
  .pipe(
    map((media: any) => (media.mqAlias === 'xs') ?  { collapsedWidth: 0, width: '100%' } : { collapsedWidth: 70, width: '300px' })
  );

  public profile$ = new Subject();
  private _subscriptions: Subscription;

  constructor(private _store: Store<any>, public media: ObservableMedia) { }

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

  ngAfterViewInit(): void {
    this._subscriptions = this.profile$
    .pipe(
      withLatestFrom(this.currentUser$, (_click, user) =>
        this._store.dispatch(new fromRouter.Go({
          path: ['users', user.id]
        }))
      )
    )
    .subscribe();
  }

  public openSidenav(): void {
    this._store.dispatch(new fromCore.OpenSidenav());
  }

  public closeSidenav(): void {
    this._store.dispatch(new fromCore.CloseSidenav());
  }

  public userManagement(): void {
    this._store.dispatch(new fromRouter.Go({ path: ['users'] }));
  }

  public goToAuthenticationPage(): void {
    this._store.dispatch(new fromRouter.Go({ path: ['auth'] }));
    this._store.dispatch(new fromCore.CloseSidenav());
  }

  public goTo(link: string): void {
    this._store.dispatch(new fromRouter.Go({ path: [link] }));
    this._store.dispatch(new fromCore.CloseSidenav());
  }

  public logout(): void {
    this._store.dispatch(new fromAuthentication.RemoteLogout());
  }

  public trackByOrder(item: MenuItem): number {
    return item.order;
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }
}
