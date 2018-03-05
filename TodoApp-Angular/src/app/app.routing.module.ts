import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListComponent } from '../app/components/todo-list/todo-list.component';
import { AddTodoComponent } from '../app/components/add-todo/add-todo.component';
const appRoutes: Routes = [
    { path: '', redirectTo: '/todos', pathMatch: 'full'},
    { path: 'todos', component: TodoListComponent },
    { path: 'add-todo', component: AddTodoComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}