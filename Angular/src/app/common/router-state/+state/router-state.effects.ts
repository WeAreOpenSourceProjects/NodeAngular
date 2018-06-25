import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, Effect } from '@ngrx/effects';
import * as fromRouter from './router-state.actions';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  constructor(private actions$: Actions, private router: Router, private location: Location) { }

  @Effect({ dispatch: false })
  navigate$ = this.actions$.ofType(fromRouter.GO)
  .pipe(
    map((action: fromRouter.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
      this.router.navigate(path, { queryParams, ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$
  .ofType(fromRouter.BACK)
  .pipe(tap(() => this.location.back()));

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$
  .ofType(fromRouter.FORWARD)
  .pipe(tap(() => this.location.forward()));
}
