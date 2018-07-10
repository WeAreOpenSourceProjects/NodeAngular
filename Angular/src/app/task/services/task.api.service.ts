import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskStateModule } from '../task-state.module';

@Injectable({
  providedIn: TaskStateModule
})
export class TaskApiService {
  private _baseUrl: string;
  private _endPoints: any;

  constructor(private _http: HttpClient) {
    const { protocol, host, port, endPoints } = environment.api;
    this._baseUrl = `${protocol}://${host}:${port}/${endPoints.basePath}`;
    this._endPoints = endPoints;
  }

  loadTasks(): Observable<any> {
    return this._http.get(`${this._baseUrl}/${this._endPoints.tasks}/me`);
  }

  addTask(task: Task): Observable<any> {
    return this._http.post(`${this._baseUrl}/${this._endPoints.tasks}`, task);
  }

  deleteTask(taskId: string): Observable<any> {
    return this._http.delete(`${this._baseUrl}/${this._endPoints.tasks}/${taskId}`);
  }

  updateTask(task: any): Observable<any> {
    return this._http.put(`${this._baseUrl}/${this._endPoints.tasks}/${task.id}`, task.changes);
  }

  deleteImage(imageId: string): Observable<any> {
    return this._http.delete(`${this._baseUrl}/${this._endPoints.media}/${imageId}`);
  }
}
