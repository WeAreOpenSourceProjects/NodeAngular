import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export const SHOW = '[User] Show';
export const LOAD_ALL = '[User] Load All';
export const LOAD_ALL_SUCCESS = '[User] Load All Success';
export const LOAD_ALL_FAILURE = '[User] Load All Failure';
export const LOAD_ONE = '[User] Load One';
export const LOAD_ONE_SUCCESS = '[User] Load One Success';
export const LOAD_ONE_FAILURE = '[One] Load One Failure';
export const HANDLE = '[User] Handle';
export const HANDLE_SUCCESS = '[User] Handle Success';
export const HANDLE_FAILURE = '[User] Handle Failure';
export const ADD = '[User] Add';
export const ADD_SUCCESS = '[User] Add Success';
export const ADD_FAILURE = '[User] Add Failure';
export const UPDATE = '[User] Update';
export const UPDATE_SUCCESS = '[User] Update Success';
export const UPDATE_FAILURE = '[User] Update Failure';
export const DELETE = '[User] Delete';
export const DELETE_SUCCESS = '[User] Delete Success';
export const DELETE_FAILURE = '[User] Delete Failure';
export const SAVE_DESCRIPTION = '[User] Save Description';
export const ADD_MEDIAS_SUCCESS = '[User] Add Medias Success';
export const DELETE_MEDIAS_SUCCESS = '[User] Delete Medias Success';

export type Actions =
  | LoadOne
  | LoadOneSuccess
  | LoadOneFailure
  | LoadAll
  | LoadAllSuccess
  | LoadAllFailure
  | Handle
  | HandleSuccess
  | HandleFailure
  | Add
  | AddSuccess
  | AddFailure
  | Update
  | UpdateSuccess
  | UpdateFailure
  | Delete
  | DeleteSuccess
  | DeleteFailure
  | SaveDescription
  | AddMediasSuccess
  | DeleteMediasSuccess;

export class LoadAll implements Action {
  readonly type = LOAD_ALL;
}

// tslint:disable-next-line:max-classes-per-file
export class LoadAllSuccess implements Action {
  readonly type = LOAD_ALL_SUCCESS;
  constructor(public payload: { users: [User] }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class LoadAllFailure implements Action {
  readonly type = LOAD_ALL_FAILURE;
  constructor(public payload: { error: any }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class LoadOne implements Action {
  readonly type = LOAD_ONE;
  constructor(public payload: string) {}

}

// tslint:disable-next-line:max-classes-per-file
export class LoadOneSuccess implements Action {
  readonly type = LOAD_ONE_SUCCESS;
  constructor(public payload: User) {}
}

// tslint:disable-next-line:max-classes-per-file
export class LoadOneFailure implements Action {
  readonly type = LOAD_ONE_FAILURE;
  constructor(public payload: { error: any }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class Handle implements Action {
  readonly type = HANDLE;
  constructor(public payload: { userId: Number }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class HandleSuccess implements Action {
  readonly type = HANDLE_SUCCESS;
  constructor(public payload: { user: User }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class HandleFailure implements Action {
  readonly type = HANDLE_FAILURE;
  constructor(public payload: { error: any }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class Add implements Action {
  readonly type = ADD;
  constructor(public payload: { user: User }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;
  constructor(public payload: { user: User }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class AddFailure implements Action {
  readonly type = ADD_FAILURE;
  constructor(public payload: { error: any }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: { user: { id: string; changes: any } }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
  constructor(public payload: { user: { id: string; changes: any } }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class AddMediasSuccess implements Action {
  readonly type = ADD_MEDIAS_SUCCESS;
  constructor(public payload: { user: { id: string; changes: any } }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class DeleteMediasSuccess implements Action {
  readonly type = DELETE_MEDIAS_SUCCESS;
  constructor(public payload: { user: { id: string; changes: any } }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class UpdateFailure implements Action {
  readonly type = UPDATE_FAILURE;
  constructor(public payload: { error: any }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: { userId: string }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public payload: { userId: string }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class DeleteFailure implements Action {
  readonly type = DELETE_FAILURE;
  constructor(public payload: { error: any }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class SaveDescription implements Action {
  readonly type = SAVE_DESCRIPTION;
  constructor(public payload: { userId: number; text: string }) {}
}
