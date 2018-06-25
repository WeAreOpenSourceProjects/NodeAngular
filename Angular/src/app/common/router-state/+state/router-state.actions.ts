import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export class Go implements Action {
  readonly type = GO;
  constructor(
    public payload: {
      path?: Array<any>;
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

// tslint:disable-next-line:max-classes-per-file
export class Back implements Action {
  readonly type = BACK;
}

// tslint:disable-next-line:max-classes-per-file
export class Forward implements Action {
  readonly type = FORWARD;
}

export type Actions = Go | Back | Forward;
