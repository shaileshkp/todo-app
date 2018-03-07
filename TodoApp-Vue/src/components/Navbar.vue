<template>
    <div>
        <h3>Todo App</h3>
        <router-link to="/todos"><h4>Home</h4></router-link>
        <router-link to="/add-todo"><h4>Add todo</h4></router-link>
    </div>
</template>
<script>
    
</script>
<style scoped>
    * {
        margin: 0px;
    }

    div {
        background-color: gray;
    }
    h4{
        display: inline;
        margin: 8px;
    }

    h3{
        font-size: 30px;
        display: inline;
        margin-right: 10px;
    }

</style>

