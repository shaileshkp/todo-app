import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {
    data: any[] = [ ]

    url= "https://still-inlet-86307.herokuapp.com";
    constructor(private http: Http) { }

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
        var headers = new Headers()
        headers.append('Content-Type', 'application/json')
        // let headers = new Headers({ 'Accept': 'application/json' })
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
        var headers = new Headers()
        headers.append('Content-Type', 'application/json')
        // let headers = new Headers({ 'Accept': 'application/json' });
        return this.http.delete(this.url+'/api/todos/'+id, { headers: headers })
        .map(
            (response: Response) => {
                if(response.status === 200){
                    var i = 0;
                    for(var todo of this.data) {
                        if(todo['_id'] === id) {
                            this.data.splice(i,1)
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

    changeStatus(id) {
        var i = 0;
        for(var todo of this.data) {
            if(todo['_id'] === id) {
                var newStatus = !this.data[i].status
                var headers = new Headers()
                headers.append('Content-Type', 'application/json')
                return this.http.patch(this.url+'/api/todos/'+id, {status: newStatus}, { headers: headers })
                .map(
                    (response: Response) => {
                        if(response.status === 200){
                            this.data[i].status = newStatus
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
            i++;
        }
    }

}