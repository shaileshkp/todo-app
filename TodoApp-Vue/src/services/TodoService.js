var axios = require('axios')
var url = 'https://still-inlet-86307.herokuapp.com'

var todos = []

function getTodos(callback) {
    axios.get(url+'/api/todos')
      .then(function (response) {
        todos = response.data
        callback(todos)
      })
      .catch(function (error) {
        callback(error)
      });
}

function addTodos(todoTxt, callback) {
    console.log('todoTxt', todoTxt)
      axios.post(url+'/api/todos', {
        todoTxt: todoTxt
      })
      .then(function (response) {
        if(response.status === 200) {
            todos.push(response.data)
            callback(response.data)
        }
      })
      .catch(function (error) {
        console.log(error);
    });
}

function deleteTodos(todoId, callback) {
    console.log('todoId', todoId)
      axios.delete(url+'/api/todos/'+todoId)
      .then(function (response) {
        if(response.status === 200) {
            var i = 0;
            for(var todo in todos) {
                if(todos[todo]['_id'] === todoId) {
                    todos.splice(i,1)
                    break;
                }
                i++;
            }
            callback(response.data)
        }
      })
      .catch(function (error) {
        console.log(error);
    });
}

function updateTodos(id, callback) {
    console.log('updateTodos', id)
    var i = 0;
    for(var todo in todos) {
        if(todos[todo]['_id'] === id) {
            var newStatus = !todos[todo].status
            console.log(todos[todo])
            axios.patch(url+'/api/todos/'+id, {
                status: newStatus
              })
              .then(function (response) {
                if(response.status === 200) {
                    console.log('Success')
                    callback(response.data)
                }
              })
              .catch(function (error) {
                console.log(error);
            });
        }
        i++;
    }
}

module.exports = {
    getTodos: getTodos,
    addTodos: addTodos,
    deleteTodos: deleteTodos,
    updateTodos: updateTodos
}
