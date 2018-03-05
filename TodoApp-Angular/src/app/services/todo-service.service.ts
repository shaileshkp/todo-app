import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {
    data: any[] = [ ]

    url= "http://localhost:3000";
    constructor(private http: Http) { }

    changeStatus(id) {
        var i = 0;
        for(var todo of this.data) {
            if(todo['_id'] === id) {
                this.data[i].status = !this.data[i].status
            }
            i++;
        }
    }
    getTodos() {
        return this.http.get(this.url+'/api/todos')
        .map(
            (response: Response) => {
                const data = response.json();
                this.data = data;
                return data;
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw('Something went wrong')
            }
        );
    }

    addTodo(data){
        // var headers = new Headers()
        let headers = new Headers({ 'Accept': 'application/json' })
        // headers.append('Content-Type', 'application/json')
        var body = JSON.stringify(data)
        console.log("body::",body)
        console.log("\n\nURL TO SEARCH FOR:: ", this.url+'/api/todos')
        var url=this.url+'/api/todos';
        return this.http.post(url, body, { headers: headers })
        .map(
            (response: Response) => {
                const data = response.json()
                this.data.push(data)
                return response.status
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw('Something went wrong')
            }
        );

        // this.data.push(data)
        // console.log(this.data)
    }

    removeTodo(id) {
        // var headers = new Headers()
        // headers.append('Content-Type', 'application/json')
        let headers = new Headers({ 'Accept': 'application/json' });
        return this.http.delete(this.url+'/api/todos/'+id, { headers: headers })
        .map(
            (response: Response) => {
                if(response.status === 200){
                    var i = 0;
                    for(var todo of this.data) {
                        if(todo['_id'] === id) {
                            this.data.slice(i,1)
                            console.log(todo)
                            break;
                        }
                        i++;
                    }
                }
                
                return response.status
            }
        )
        .catch(
            (error: Response) => {
                return Observable.throw('Something went wrong')
            }
        );
    }
}