import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  httpClient = inject(HttpClient);
  
  getUrl(userId: number){ return `https://jsonplaceholder.typicode.com/users/${userId}/todos` }

  public getUserTodos(userId: number){
    let url = this.getUrl(userId);

    return this.httpClient.get<Todo[]>(url);
  }
}
