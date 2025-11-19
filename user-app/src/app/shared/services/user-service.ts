import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'https://jsonplaceholder.typicode.com/users';

  httpClient = inject(HttpClient)

  public getUsers(): Observable<User[]>
  {
    return this.httpClient.get<User[]>(this.url);
  }

  public getUsersPaginated()
  {

  }
}
