import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  
  data: any[] = []

  constructor(private todoService: TodoService) { 
  }

  ngOnInit() {
  
    this.todoService.getTodos().subscribe(
      (todos: any[] )=> {
        this.data = todos
      })
    
  }
}
