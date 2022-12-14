<script lang="ts">
    import type { ITodo } from '$root/types/todo'

    import AddTodo from './AddTodo.svelte'
    import Todo from './Todo.svelte'
    import TodosLeft from './TodosLeft.svelte'

    // state
    let todos: ITodo[] = [
        { id: '1e4a59703af84', text: 'Todo 1', completed: true },
        { id: '9e09bcd7b9349', text: 'Todo 2', completed: false },
        { id: '9e4273a51a37c', text: 'Todo 3', completed: false },
        { id: '53ae48bf605cc', text: 'Todo 4', completed: false },
    ]

    // debug
    $: console.log(todos)

    // computed
    $: todosAmount = todos.length
    $: incompleteTodos = todos.filter(todo => !todo.completed).length

    // methods
    function generateRandomId(): string {
        return Math.random().toString(16).slice(2)
    }

    function addTodo(todo: string): void {
        let newTodo: ITodo = {
            id: generateRandomId(),
            text: todo,
            completed: false,
        }
        todos = [...todos, newTodo]
    }

    function toggleCompleted(event: MouseEvent): void {
        let { checked } = event.target as HTMLInputElement

        todos = todos.map(todo => ({
            ...todo,
            completed: checked
        }))
    } 

    function completeTodo(id: string): void {
        todos = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        })
    }

    function removeTodo(id: string): void {
      todos = todos.filter(todo => todo.id !== id)
    }

    function editTodo(id: string, newTodo: string): void {
      let currentTodo = todos.findIndex(todo => todo.id === id)
      todos[currentTodo].text = newTodo
    }
</script>

<main>
    <h1 class="title">todos</h1>

    <section class="todos">
        <AddTodo {addTodo} {toggleCompleted} {todosAmount} />

        {#if todosAmount}
        <ul class="todo-list">
            {#each todos as todo (todo.id)}
                <Todo {todo} {completeTodo} {removeTodo} {editTodo} />
            {/each}
        </ul>

        <div class="actions">
            <TodosLeft {incompleteTodos} />
            <div class="filters">
                <button class="filter">All</button>
                <button class="filter">Active</button>
                <button class="filter">Completed</button>
            </div>
            <button class="clear-completed">Clear completed</button>
        </div>
        {/if}
    </section>
</main>

<style>
    /* Todos */
  
    .title {
      font-size: var(--font-80);
      font-weight: inherit;
      text-align: center;
      color: var(--color-title);
    }
  
    .todos {
      --width: 500px;
      --todos-bg: hsl(0 0% 98%);
      --todos-text: hsl(220 20% 14%);
  
      width: var(--width);
      color: var(--todos-text);
      background-color: var(--todos-bg);
      border-radius: var(--radius-base);
      border: 1px solid var(--color-gray-90);
      box-shadow: 0 0 4px var(--shadow-1);
    }
  
    .todo-list {
      list-style: none;
    }
  
    .actions {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-8) var(--spacing-16);
      font-size: 0.9rem;
      border-top: 1px solid var(--color-gray-90);
    }
  
    .actions:before {
      content: '';
      height: 40px;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      box-shadow: 0 1px 1px hsla(0, 0%, 0%, 0.2), 0 8px 0 -3px hsl(0, 0%, 96%),
        0 9px 1px -3px hsla(0, 0%, 0%, 0.2), 0 16px 0 -6px hsl(0, 0%, 96%),
        0 17px 2px -6px hsla(0, 0%, 0%, 0.2);
      z-index: -1;
    }
  
    /* Filters */
  
    .filters {
      display: flex;
      gap: var(--spacing-4);
    }
  
    .filter {
      text-transform: capitalize;
      padding: var(--spacing-4) var(--spacing-8);
      border: 1px solid transparent;
      border-radius: var(--radius-base);
    }
  
    .filter:hover {
      border: 1px solid var(--color-highlight);
    }
  
    .selected {
      border-color: var(--color-highlight);
    }
  </style>
  