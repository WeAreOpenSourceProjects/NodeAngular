import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs/Observable';
import { environment } from '@waos/common/environments';

@Injectable()
export class TaskApiService {
  private _baseUrl: string;
  private _endpoints: any;

  constructor(private http: HttpClient) {
    const { protocol, host, port, endpoints } = environment.api;
    this._baseUrl = `${protocol}://${host}:${port}/${endpoints.basepath}`;
    this._endpoints = endpoints;
  }

  loadTasks(): Observable<any> {
    return this.http.get(`${this._baseUrl}/${this._endpoints.tasks}/me`);
  }

  addTask(task: Task): Observable<any> {
    return this.http.post(`${this._baseUrl}/${this._endpoints.tasks}`, task);
  }

  deleteTask(taskId: string): Observable<any> {
    return this.http.delete(`${this._baseUrl}/${this._endpoints.tasks}/${taskId}`);
  }

  updateTask(task: any): Observable<any> {
    return this.http.put(`${this._baseUrl}/${this._endpoints.tasks}/${task.id}`, task.changes);
  }

  deleteImage(imageId: string): Observable<any> {
    return this.http.delete(`${this._baseUrl}/${this._endpoints.media}/${imageId}`);
  }
}
