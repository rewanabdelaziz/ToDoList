import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../Model/task';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CRUDService {
  s_URL:string;
  constructor(private http :HttpClient) {
    this.s_URL= 'http://localhost:3000/tasks'
  }

  addTask(task : Task): Observable<Task>{
    return this.http.post<Task>(this.s_URL,task);
  }

  getAllTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.s_URL);
  }

  deleteTask(id:number): Observable<Task>{
    return this.http.delete<Task>(`${this.s_URL}/${id}`);
  }

  editTask(task : Task): Observable<Task>{
    return this.http.put<Task>(`${this.s_URL}/${task.id}`, task);
  }
}
