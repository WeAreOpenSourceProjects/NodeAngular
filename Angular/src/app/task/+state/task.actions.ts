import { Action } from '@ngrx/store';
import { Task } from '../models/task.model';

export const SHOW = '[Task] Show';
export const LOAD = '[Task] Load';
export const LOAD_SUCCESS = '[Task] Load Success';
export const LOAD_FAILURE = '[Task] Load Failure';
export const HANDLE = '[Task] Handle';
export const HANDLE_SUCCESS = '[Task] Handle Success';
export const HANDLE_FAILURE = '[Task] Handle Failure';
export const ADD = '[Task] Add';
export const ADD_SUCCESS = '[Task] Add Success';
export const ADD_FAILURE = '[Task] Add Failure';
export const UPDATE = '[Task] Update';
export const UPDATE_SUCCESS = '[Task] Update Success';
export const UPDATE_FAILURE = '[Task] Update Failure';
export const DELETE = '[Task] Delete';
export const DELETE_SUCCESS = '[Task] Delete Success';
export const DELETE_FAILURE = '[Task] Delete Failure';
export const SAVE_DESCRIPTION = '[Task] Save Description';
export const ADD_MEDIAS_SUCCESS = '[Task] Add Medias Success';
export const DELETE_MEDIAS_SUCCESS = '[Task] Delete Medias Success';

export type Actions =
  | Load
  | LoadSuccess
  | LoadFailure
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

export class Load implements Action {
  readonly type = LOAD;
}

// tslint:disable-next-line:max-classes-per-file
export class LoadSuccess implements Action {
  readonly type = LOAD_SUCCESS;
  constructor(public payload: { tasks: Array<Task> }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class LoadFailure implements Action {
  readonly type = LOAD_FAILURE;
  constructor(public payload: { error: any }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class Handle implements Action {
  readonly type = HANDLE;
  constructor(public payload: { taskId: String }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class HandleSuccess implements Action {
  readonly type = HANDLE_SUCCESS;
  constructor(public payload: { task: Task }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class HandleFailure implements Action {
  readonly type = HANDLE_FAILURE;
  constructor(public payload: { error: any }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class Add implements Action {
  readonly type = ADD;
  constructor(public payload: { task: Task }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;
  constructor(public payload: { task: Task }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class AddFailure implements Action {
  readonly type = ADD_FAILURE;
  constructor(public payload: { error: any }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class Update implements Action {
  readonly type = UPDATE;
  constructor(public payload: { task: { id: string; changes: any } }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class UpdateSuccess implements Action {
  readonly type = UPDATE_SUCCESS;
  constructor(public payload: { task: { id: string; changes: any } }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class AddMediasSuccess implements Action {
  readonly type = ADD_MEDIAS_SUCCESS;
  constructor(public payload: { task: { id: string; changes: any } }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class DeleteMediasSuccess implements Action {
  readonly type = DELETE_MEDIAS_SUCCESS;
  constructor(public payload: { task: { id: string; changes: any } }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class UpdateFailure implements Action {
  readonly type = UPDATE_FAILURE;
  constructor(public payload: { error: any }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class Delete implements Action {
  readonly type = DELETE;
  constructor(public payload: { taskId: string }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class DeleteSuccess implements Action {
  readonly type = DELETE_SUCCESS;
  constructor(public payload: { taskId: string }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class DeleteFailure implements Action {
  readonly type = DELETE_FAILURE;
  constructor(public payload: { error: any }) {}
}

// tslint:disable-next-line:max-classes-per-file
export class SaveDescription implements Action {
  readonly type = SAVE_DESCRIPTION;
  constructor(public payload: { taskId: string; text: string }) {}
}
