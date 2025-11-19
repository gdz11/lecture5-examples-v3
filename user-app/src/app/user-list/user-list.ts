import { Component, inject } from '@angular/core';
import { UserService } from '../shared/services/user-service';
import { TodoService } from '../shared/services/todo-service';
import { User } from '../shared/models/user';
import { Todo } from '../shared/models/todo';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  userService = inject(UserService);
  todoService = inject(TodoService);
  users: User[]= [];
  todos: Todo[] = [];
  isUserLoading = false;
  isUserLoadingFailed = false;
  selectedUserId?: number = undefined;

  loadUsers(){
    this.isUserLoading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isUserLoading = false;
        this.isUserLoadingFailed = false;
      },
      error: (error) => {
        this.isUserLoading = false;
        this.isUserLoadingFailed = true;
        alert(error.message)
      }
    });
  }

  loadTodos(userId: number){
    this.todoService.getUserTodos(userId).subscribe(d => {
      this.todos = d;
    })
  }

  onSelectUser(userId: number){
    this.selectedUserId = userId;
    this.loadTodos(userId);
  }

  onReload(){
    this.loadUsers();
  }

  ngOnInit(): void {
    this.loadUsers();
  }
}
