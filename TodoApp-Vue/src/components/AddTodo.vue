<template>
    <div>
    <h3 id="heading">Please input new todo</h3>
    <hr>
    <input type="text" id="txtInputTodo"  placeholder="Input Todo" v-model="todoTxt">
    <button type="submit" id="btnSubmit" @click="addTodo">ADD TODO</button>
    </div>
</template>
<script>
import TodoService from '../services/TodoService'
export default {
    data: function() {
        return {
            todoTxt: ''
        }
    },
    methods: {
        addTodo() {
            var todoTxt = this.todoTxt
            TodoService.addTodos(todoTxt, res => {
                console.log(res)
            })
        }
    }
}
</script>
<style scoped>
    #txtInputTodo {
        font-size: 20px;
        margin: 8px;
        width: stretch;
        display: block;
    }

    #btnSubmit {
        font-size: 20px;
        display: block;
        width: stretch;
        margin: 8px;
    }

    #heading {
        font-size: 20px;
        display: block;
        margin: 8px;
        text-align: center;
    }
</style>
