import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo-service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  metaData: any[] = []
  data: any[] = []
  completedChecked = true;
  notCompletedChecked = true;

  constructor(private todoService: TodoService) { 
  }

  ngOnInit() {
  
    this.todoService.getTodos().subscribe(
      (todos: any[] )=> {
        this.data = todos
        this.metaData = todos
      })
    
  }

  onCompletedClick(isChecked: {selected: boolean}) {
    this.completedChecked =  isChecked.selected
    this.changeList()
  }

  onNotCompletedClick(isChecked: {selected: boolean}) {
    this.notCompletedChecked =  isChecked.selected
    this.changeList()
  }

  changeList() {
    this.metaData = []

    if(this.completedChecked && this.notCompletedChecked) {
      this.metaData = this.data
    } else if(this.completedChecked) {
      for(var todo of this.data) {
        if(todo.status === true) {  
          this.metaData.push(todo)
        }
      }
    } else if(this.notCompletedChecked) {
      for(var todo of this.data) {
        if(todo.status === false) {
          this.metaData.push(todo)
        }
      }
    }

    // if(!isChecked.selected){
    //   for(var todo of this.data) {
    //     if(todo.staus === false) {  
    //     }
    //   }
    // }
  }

}
