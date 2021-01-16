import { TaskModel } from './../classes/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API="http://localhost:3000/api/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {



  deleteTask(task: TaskModel):Observable<any> {
    return  this.http.delete<any>(`${API}/${task._id}`);

  }

  constructor(private http:HttpClient) { }

  public get getTasks() : Observable<TaskModel []> {
    return this.http.get<TaskModel[]>(`${API}`);
  }

  public  changeStatus(task:TaskModel): Observable<string> {
    task.isCompleted= !task.isCompleted;
    return this.http.put<string>(`${API}/${task._id}`,task);
  }

  public addTask(task:TaskModel):Observable<any>{
    return this.http.post<any>(`${API}/newtask`,task, {
      headers:new  HttpHeaders().append("Content-Type","application/json")
    });
  }

}
