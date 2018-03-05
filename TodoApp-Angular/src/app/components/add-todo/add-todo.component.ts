import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TodoService } from '../../services/todo-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  todo: FormGroup;
  constructor(private todoService: TodoService,  private router: Router) { }

  ngOnInit() {
    this.todo = new FormGroup({
      txtTodo: new FormControl(null, [Validators.required])
    })
  }
  onTodoAdd() {
    var todo = { todoTxt:this.todo.value.txtTodo }
  
    this.todoService.addTodo(todo)
    .subscribe(
      (response) => {
        if(response.status === 200) {
          this.router.navigateByUrl('/')
        } else if(response.status === 404) {
          
        }  else {
         
        }
      },
      (error) => console.log(error)
    );
  }
}
