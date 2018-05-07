import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { environment } from '@labdat/common/environments';

@Injectable()
export class UserApiService {

  private _baseUrl: string;
  private _endpoints: any;

  constructor(private http: HttpClient) {
    const { protocol, host, port, endpoints } = environment.api;
    this._baseUrl = `${protocol}://${host}:${port}/${endpoints.basepath}`;
    this._endpoints = endpoints;
  }

  loadUsers(): Observable<any> {
    return this.http.get(`${this._baseUrl}/${this._endpoints.users}`)
    .pipe(map((users: Array<User>) => users.map(user => ({ ...user, id: user.id }))));
  }

  addUser(user: User): Observable<any> {
    return this.http.post(`${this._baseUrl}/${this._endpoints.users}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this._baseUrl}/${this._endpoints.users}/${userId}`)
    .pipe(map((user: any) => ({ ...user, id: user.id })));
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this._baseUrl}/${this._endpoints.users}/${user.id}`, user.changes);
  }

  deleteImage(imageId: string): Observable<any> {
    return this.http.delete(`${this._baseUrl}/${this._endpoints.media}/${imageId}`);
  }
}
