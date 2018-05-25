import { Injectable } from '@angular/core';
import { Credentials } from '../models/authenticate.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '@labdat/common/environments';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationApiService {
  private _baseUrl: string;
  private _endpoints: any;

  constructor(private http: HttpClient) {
    const { protocol, host, port, endpoints } = environment.api;
    this._baseUrl = `${protocol}://${host}:${port}/${endpoints.basepath}`;
    this._endpoints = endpoints;
  }

  login({ email, password }: Credentials): Observable<any> {
    return this.http.post(
      `${this._baseUrl}/${this._endpoints.auth}/signin`,
      { password, usernameOrEmail: email },
      { withCredentials: true }
    );
  }

  register(registration: any): Observable<any> {
    return this.http.post(`${this._baseUrl}/${this._endpoints.auth}/signup`, registration);
    //      .do(token => this.setAuthorizationHeader(token));
  }

  addUser(idToken: any): Observable<any> {
    return this.http.post(`${this._baseUrl}/${this._endpoints.users}/accounts`, idToken);
    //      .do(token => this.setAuthorizationHeader(token));
  }

  loadUser(): Observable<any> {
    return this.http.get(`${this._baseUrl}/${this._endpoints.users}/me`);
    //      .do(token => this.setAuthorizationHeader(token));
  }

  updateUser(user): Observable<any> {
    return this.http.put(`${this._baseUrl}/${this._endpoints.users}`, user);
    //      .do(token => this.setAuthorizationHeader(token));
  }

  changePassword(email: string): Observable<any> {
    return this.http.post(`${this._baseUrl}/${this._endpoints.auth}/forgot`, { email });
    //      .do(token => this.setAuthorizationHeader(token));
  }

  resetPassword(newPassword: string, token: string): Observable<any> {
    return this.http.post(`${this._baseUrl}/${this._endpoints.auth}/reset`, { newPassword, token });
    //      .do(token => this.setAuthorizationHeader(token));
  }

}
