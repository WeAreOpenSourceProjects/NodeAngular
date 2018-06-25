import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, tap, first, delay } from 'rxjs/operators';
import * as fromTask from '../+state/task.actions';
import { selectTaskLoaded } from '../+state/task.selectors';

@Injectable()
export class TaskGuardService implements CanActivate, CanDeactivate<any> {
  constructor(private store: Store<any>) { }

  canActivate(): Observable<boolean> | boolean {
    return this.store
    .select(selectTaskLoaded)
    .pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromTask.Load());
        }
      }),
      filter(loaded => loaded),
      first()
    );
  }

  canDeactivate(_comp): Observable<boolean> | boolean {
    return of(true)
    .pipe(delay(3000));
  }
}
