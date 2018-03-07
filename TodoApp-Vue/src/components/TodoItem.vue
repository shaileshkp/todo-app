<template>
    <div class="todo-item">
        <div class="todo-txt" @click="changeStatus(todo._id)">
            <input type="checkbox" value="todo._id" :checked="todo.status">{{todo.todoTxt}}
        </div>
        <div class="del-btn-div">
            <button @click="removeTodo(todo._id)" class="del-btn">DEL</button>
        </div>
    </div>
</template>
<script>
export default {
    props:["todo"],
    methods: {
        changeStatus(id) {
            console.log(id)
        },
        removeTodo(id) {
            console.log(id)                
        }
    }
}
</script>
<style>
.todo-item{
    margin: 2px;
    padding: 2px;
    border: 1px solid slateblue;
}

.todo-item:hover{
    background-color: paleturquoise;
}

.todo-txt, .del-btn-div {
    display: inline;
}

.del-btn {
    position: absolute;
    right: 2px;
    margin-right: 4px;
    color: red;
}
</style>

