import { Component, signal } from '@angular/core';
import { StudentManagement } from './student-management/student-management';

@Component({
  selector: 'app-root',
  imports: [StudentManagement],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('student-app');
}
