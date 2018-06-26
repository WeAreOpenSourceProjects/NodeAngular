import { Injectable } from '@angular/core';
import { Credentials } from '../models/authenticate.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthenticationStateModule } from '../authentication-state.module';
@Injectable({
  providedIn: AuthenticationStateModule
})
export class AuthenticationApiService {
  private _baseUrl: string;
  private _endPoints: any;

  constructor(private http: HttpClient) {
    const { protocol, host, port, endPoints } = environment.api;
    this._baseUrl = `${protocol}://${host}:${port}/${endPoints.basePath}`;
    this._endPoints = endPoints;
  }

  login({ email, password }: Credentials): Observable<any> {
    return this.http.post(
      `${this._baseUrl}/${this._endPoints.auth}/signin`,
      { password, usernameOrEmail: email },
      { withCredentials: true }
    );
  }

  register(registration: any): Observable<any> {
    return this.http.post(`${this._baseUrl}/${this._endPoints.auth}/signup`, registration);
    //      .do(token => this.setAuthorizationHeader(token));
  }

  addUser(idToken: any): Observable<any> {
    return this.http.post(`${this._baseUrl}/${this._endPoints.users}/accounts`, idToken);
    //      .do(token => this.setAuthorizationHeader(token));
  }

  loadUser(): Observable<any> {
    return this.http.get(`${this._baseUrl}/${this._endPoints.users}/me`);
    //      .do(token => this.setAuthorizationHeader(token));
  }

  updateUser(user): Observable<any> {
    return this.http.put(`${this._baseUrl}/${this._endPoints.users}`, user);
    //      .do(token => this.setAuthorizationHeader(token));
  }

  changePassword(email: string): Observable<any> {
    return this.http.post(`${this._baseUrl}/${this._endPoints.auth}/forgot`, { email });
    //      .do(token => this.setAuthorizationHeader(token));
  }

  resetPassword(newPassword: string, token: string): Observable<any> {
    return this.http.post(`${this._baseUrl}/${this._endPoints.auth}/reset`, { newPassword, token });
    //      .do(token => this.setAuthorizationHeader(token));
  }

}
