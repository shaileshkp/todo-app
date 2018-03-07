<template>
    <div>
        <h2 style="text-align: center">TODO-LIST</h2>
        <hr>
        <div>
            <app-todo-item v-for="todo in todos" :todo="todo" :key="todo._id"></app-todo-item>
        </div>
        <div class="inside">
            <app-todo-actions></app-todo-actions>
        </div>
    </div>
</template>
<script>
    import TodoItem from './TodoItem.vue'
    import TodoAction from './TodoAction.vue'
    export default {
        data: function (){
            return {
                todos: []
            }
        },
        components: {
            appTodoItem: TodoItem,
            appTodoActions: TodoAction
        },
        created: function () {
            this.$http.get('http://localhost:3000/api/todos').then(response => {
                this.todos = response.data
            })
        }
    }
</script>
<style scoped>
    * {
        margin: 0px;
    }
    .inside {
        position: absolute;
        bottom: 2px;
    }
</style>
