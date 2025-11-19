import { Component, inject } from '@angular/core';
import { Student } from '../shared/models/student';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../shared/services/student-service';

@Component({
  selector: 'app-student-management',
  imports: [ReactiveFormsModule],
  templateUrl: './student-management.html',
  styleUrl: './student-management.css',
})
export class StudentManagement {

  studentService = inject(StudentService);

  public students: Student[] = [];

  public editingStudent?: Student = undefined; 

  addForm = new FormGroup({
    name: new FormControl('', Validators.required),
    personalNumber: new FormControl('', Validators.required)
  });

  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    personalNumber: new FormControl('', Validators.required)
  });

  addStudent(){
    this.studentService.addStudent({
      id: '',
      name: this.addForm.value.name!,
      personalNumber: this.addForm.value.personalNumber!
    }).subscribe(() => {
      this.loadStudents();
    });
  }

  editStudent(student: Student){
    this.editingStudent = student;

    this.editForm.setValue({
      name: this.editingStudent?.name,
      personalNumber: this.editingStudent?.personalNumber
    });
  }

  cancelEditStudent(){
    this.editingStudent = undefined;
  }

  updateStudent(){
    this.studentService.updateStudent({
      id: this.editingStudent!.id,
      name: this.editForm.value.name!,
      personalNumber: this.editForm.value.personalNumber!
    }).subscribe(d => {
      this.editingStudent = undefined;
      this.loadStudents();
    })
  }

  deleteStudent(id: string){
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    })
  }

  loadStudents(){
    this.studentService.getStudents().subscribe(d => {
      this.students = d;
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }
}
