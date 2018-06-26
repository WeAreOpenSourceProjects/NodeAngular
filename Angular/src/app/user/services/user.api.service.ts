import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserStateModule } from '../user-state.module';

@Injectable({
  providedIn: UserStateModule
})
export class UserApiService {

  private _baseUrl: string;
  private _endPoints: any;

  constructor(private http: HttpClient) {
    const { protocol, host, port, endPoints } = environment.api;
    this._baseUrl = `${protocol}://${host}:${port}/${endPoints.basePath}`;
    this._endPoints = endPoints;
  }

  loadUser(userId: string): Observable<any> {
    return this.http.get(`${this._baseUrl}/${this._endPoints.users}/${userId}`)
    .pipe(map((user: User) => ({ ...user, id: user.id })));
  }

  loadUsers(): Observable<any> {
    return this.http.get(`${this._baseUrl}/${this._endPoints.users}`)
    .pipe(map((users: [User]) => users.map(user => ({ ...user, id: user.id }))));
  }

  addUser(idToken: any): Observable<any> {
    return this.http.post(`${this._baseUrl}/${this._endPoints.users}`, idToken);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this._baseUrl}/${this._endPoints.users}/${userId}`)
    .pipe(map((user: any) => ({ ...user, id: user.id })));
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this._baseUrl}/${this._endPoints.users}/${user.id}`, user.changes);
  }

  deleteImage(imageId: string): Observable<any> {
    return this.http.delete(`${this._baseUrl}/${this._endPoints.media}/${imageId}`);
  }
}
