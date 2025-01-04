import { Injectable } from '@angular/core';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  description: string;

  isEditing?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly STORAGE_KEY = 'todoList';

  constructor() {}

  getTodoList(): TodoItem[] {
    const storedTodoList = localStorage.getItem(this.STORAGE_KEY);
    return storedTodoList ? JSON.parse(storedTodoList) : [];
  }

  saveTodoList(todoList: TodoItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todoList));
  }

  addTask(todoList: TodoItem[], task: string,description: string): TodoItem[] {
    if (task.trim() !== '') {
      const newTask: TodoItem = {
        id: Date.now(),
        task: task.trim(),
        description: description.trim(),

        completed: false,
      };
      todoList.push(newTask);
      this.saveTodoList(todoList);
    }
    return todoList;
  }

  deleteTask(todoList: TodoItem[], taskId: number): TodoItem[] {
    const updatedList = todoList.filter((item) => item.id !== taskId);
    this.saveTodoList(updatedList);
    return updatedList;
  }

  toggleTaskCompletion(todoList: TodoItem[], taskId: number): TodoItem[] {
    const updatedList = todoList.map((item) => {
      if (item.id === taskId) {
        item.completed = !item.completed;
        console.log(`Task ${item.id} completed status: ${item.completed}`);
      }
      return item;
    });
    this.saveTodoList(updatedList);
    return updatedList;
  }
  

  
  editTask(todoList: TodoItem[], taskId: number, updatedTask: string, updatedDescription: string): TodoItem[] {
    const task = todoList.find((item) => item.id === taskId);
    if (task) {
      if (updatedTask.trim()) task.task = updatedTask.trim();
      if (updatedDescription.trim()) task.description = updatedDescription.trim();
      this.saveTodoList(todoList);
    }
    return todoList;
  }
  
}
