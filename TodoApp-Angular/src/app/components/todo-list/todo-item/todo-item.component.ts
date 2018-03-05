import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../../../services/todo-service.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  
  @Input() todo: any;
  btn = 'btn'
  list= 'list'
  constructor(private todoService: TodoService) { 
  }

  ngOnInit() {
    
  }
  
  changeStatus(id) {
    this.todoService.changeStatus(id)
  }

  removeTodo(id) {
    this.todoService.removeTodo(id)
    .subscribe(
      (response) => {
        if(response.status === 200) {
          console.log('Deleted ',id)
        } else if(response.status === 404) {
          
        }  else {
         
        }
      },
      (error) => console.log(error)
    );
  }
}
