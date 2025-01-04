import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from './services/todo.service';
import { TodoItem } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AppComponent {
  todoList: TodoItem[] = [];
  task: string = '';  // Bind input fields to properties
  description: string = '';
  @ViewChild('todoText') todoInputRef!: ElementRef<HTMLInputElement>;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoList = this.todoService.getTodoList();
  }

  addTask(): void {
    if (!this.task.trim()) {
      alert('Task cannot be empty!');
      return;
    }
    this.todoList = this.todoService.addTask(this.todoList, this.task, this.description);
    this.task = '';  // Clear task field after adding
    this.description = '';  // Clear description field
  }

  deleteTask(taskId: number): void {
    this.todoList = this.todoService.deleteTask(this.todoList, taskId);
  }

  toggleCompleted(taskId: number): void {
    this.todoList = this.todoService.toggleTaskCompletion(this.todoList, taskId);
  }

  editTask(todoItem: TodoItem): void {
    todoItem.isEditing = true;
  }

  saveEdit(todoItem: TodoItem): void {
    if (!todoItem.task.trim()) {
      alert('Task cannot be empty!');
      return;
    }
    todoItem.isEditing = false;
    this.todoList = this.todoService.editTask(this.todoList, todoItem.id, todoItem.task, todoItem.description);
  }
}
