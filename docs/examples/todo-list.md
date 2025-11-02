# Todo List Example

A complete todo list application showcasing TinyPine's state management, event handling, and list rendering capabilities.

## Basic Todo List

```html
<div t-data="simpleTodo()">
  <input t-model="newTodo" type="text" placeholder="Add a new task...">
  <button t-click="addTodo()">Add</button>

  <ul>
    <li t-for="(todo, index) in todos">
      <span t-text="todo"></span>
      <button t-click="removeTodo(index)">Delete</button>
    </li>
  </ul>
</div>

<script>
  function simpleTodo() {
    return {
      newTodo: '',
      todos: [],

      addTodo() {
        if (this.newTodo.trim()) {
          this.todos.push(this.newTodo)
          this.newTodo = ''
        }
      },

      removeTodo(index) {
        this.todos.splice(index, 1)
      }
    }
  }
</script>
```

<div t-data="{ newTodo: '', todos: ['Buy groceries', 'Walk the dog'], addTodo() { if (this.newTodo.trim()) { this.todos.push(this.newTodo); this.newTodo = '' } }, removeTodo(index) { this.todos.splice(index, 1) } }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2">
    <input t-model="newTodo" type="text" placeholder="Add a new task..." class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    <button t-click="addTodo()" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
      Add
    </button>
  </div>

  <ul class="space-y-2">
    <li t-for="(todo, index) in todos" class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <span t-text="todo" class="text-gray-900 dark:text-white"></span>
      <button t-click="removeTodo(index)" class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm">
        Delete
      </button>
    </li>
  </ul>

  <p t-show="todos.length === 0" class="text-center text-gray-500 py-4">No tasks yet. Add one above!</p>
</div>

## Todo with Completion Status

```html
<div t-data="todoWithStatus()">
  <input t-model="newTodo" placeholder="Add task...">
  <button t-click="addTodo()">Add</button>

  <ul>
    <li t-for="todo in todos">
      <input t-model="todo.completed" type="checkbox">
      <span :class="{ 'line-through': todo.completed }" t-text="todo.text"></span>
      <button t-click="removeTodo(todo)">Delete</button>
    </li>
  </ul>

  <p>Completed: <span t-text="completedCount"></span> / <span t-text="todos.length"></span></p>
</div>

<script>
  function todoWithStatus() {
    return {
      newTodo: '',
      todos: [],

      get completedCount() {
        return this.todos.filter(t => t.completed).length
      },

      addTodo() {
        if (this.newTodo.trim()) {
          this.todos.push({
            text: this.newTodo,
            completed: false,
            id: Date.now()
          })
          this.newTodo = ''
        }
      },

      removeTodo(todo) {
        const index = this.todos.indexOf(todo)
        this.todos.splice(index, 1)
      }
    }
  }
</script>
```

<div t-data="{ newTodo: '', todos: [{text: 'Buy groceries', completed: false, id: 1}, {text: 'Walk the dog', completed: true, id: 2}], get completedCount() { return this.todos.filter(t => t.completed).length }, addTodo() { if (this.newTodo.trim()) { this.todos.push({ text: this.newTodo, completed: false, id: Date.now() }); this.newTodo = '' } }, removeTodo(todo) { const index = this.todos.indexOf(todo); this.todos.splice(index, 1) } }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2">
    <input t-model="newTodo" type="text" placeholder="Add a new task..." class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    <button t-click="addTodo()" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
      Add
    </button>
  </div>

  <ul class="space-y-2">
    <li t-for="todo in todos" class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <input t-model="todo.completed" type="checkbox" class="w-5 h-5 text-pine-600 rounded">
      <span t-text="todo.text" :class="todo.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'" class="flex-1"></span>
      <button t-click="removeTodo(todo)" class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm">
        Delete
      </button>
    </li>
  </ul>

  <div class="p-3 bg-pine-50 dark:bg-pine-900/20 border border-pine-200 dark:border-pine-800 rounded-lg">
    <p class="text-center text-gray-900 dark:text-white">
      Completed: <span t-text="completedCount" class="font-bold text-pine-600">0</span> / <span t-text="todos.length" class="font-bold">0</span>
    </p>
  </div>
</div>

## Todo with Filtering

```html
<div t-data="filteredTodo()">
  <!-- Input -->
  <input t-model="newTodo" placeholder="Add task...">
  <button t-click="addTodo()">Add</button>

  <!-- Filters -->
  <div class="filters">
    <button t-click="filter = 'all'" :class="{ active: filter === 'all' }">
      All (<span t-text="todos.length"></span>)
    </button>
    <button t-click="filter = 'active'" :class="{ active: filter === 'active' }">
      Active (<span t-text="activeCount"></span>)
    </button>
    <button t-click="filter = 'completed'" :class="{ active: filter === 'completed' }">
      Completed (<span t-text="completedCount"></span>)
    </button>
  </div>

  <!-- List -->
  <ul>
    <li t-for="todo in filteredTodos">
      <input t-model="todo.completed" type="checkbox">
      <span t-text="todo.text"></span>
      <button t-click="removeTodo(todo)">Delete</button>
    </li>
  </ul>
</div>

<script>
  function filteredTodo() {
    return {
      newTodo: '',
      todos: [],
      filter: 'all',

      get filteredTodos() {
        if (this.filter === 'active') {
          return this.todos.filter(t => !t.completed)
        }
        if (this.filter === 'completed') {
          return this.todos.filter(t => t.completed)
        }
        return this.todos
      },

      get activeCount() {
        return this.todos.filter(t => !t.completed).length
      },

      get completedCount() {
        return this.todos.filter(t => t.completed).length
      },

      addTodo() {
        if (this.newTodo.trim()) {
          this.todos.push({
            text: this.newTodo,
            completed: false,
            id: Date.now()
          })
          this.newTodo = ''
        }
      },

      removeTodo(todo) {
        const index = this.todos.indexOf(todo)
        this.todos.splice(index, 1)
      }
    }
  }
</script>
```

<div t-data="{ newTodo: '', todos: [{text: 'Buy groceries', completed: false, id: 1}, {text: 'Walk the dog', completed: true, id: 2}, {text: 'Read a book', completed: false, id: 3}], filter: 'all', get filteredTodos() { if (this.filter === 'active') return this.todos.filter(t => !t.completed); if (this.filter === 'completed') return this.todos.filter(t => t.completed); return this.todos }, get activeCount() { return this.todos.filter(t => !t.completed).length }, get completedCount() { return this.todos.filter(t => t.completed).length }, addTodo() { if (this.newTodo.trim()) { this.todos.push({ text: this.newTodo, completed: false, id: Date.now() }); this.newTodo = '' } }, removeTodo(todo) { const index = this.todos.indexOf(todo); this.todos.splice(index, 1) } }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2">
    <input t-model="newTodo" type="text" placeholder="Add a new task..." class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    <button t-click="addTodo()" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
      Add
    </button>
  </div>

  <div class="flex gap-2 justify-center">
    <button t-click="filter = 'all'" :class="filter === 'all' ? 'bg-pine-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'" class="px-4 py-2 rounded-lg transition-colors">
      All (<span t-text="todos.length"></span>)
    </button>
    <button t-click="filter = 'active'" :class="filter === 'active' ? 'bg-pine-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'" class="px-4 py-2 rounded-lg transition-colors">
      Active (<span t-text="activeCount"></span>)
    </button>
    <button t-click="filter = 'completed'" :class="filter === 'completed' ? 'bg-pine-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'" class="px-4 py-2 rounded-lg transition-colors">
      Completed (<span t-text="completedCount"></span>)
    </button>
  </div>

  <ul class="space-y-2">
    <li t-for="todo in filteredTodos" class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <input t-model="todo.completed" type="checkbox" class="w-5 h-5 text-pine-600 rounded">
      <span t-text="todo.text" :class="todo.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'" class="flex-1"></span>
      <button t-click="removeTodo(todo)" class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm">
        Delete
      </button>
    </li>
  </ul>

  <p t-show="filteredTodos.length === 0" class="text-center text-gray-500 py-4">No tasks in this category</p>
</div>

## Key Concepts

### 1. Array Management

```javascript
// Adding items
this.todos.push(newItem)

// Removing items
this.todos.splice(index, 1)

// Updating items
this.todos[index].completed = true
```

### 2. Computed Properties

```javascript
get completedCount() {
  return this.todos.filter(t => t.completed).length
}
```

Computed properties automatically update when their dependencies change.

### 3. Filtering Lists

```javascript
get filteredTodos() {
  return this.todos.filter(t => !t.completed)
}
```

Create filtered views of your data without modifying the original array.

### 4. Object Structure

```javascript
{
  text: 'Todo text',
  completed: false,
  id: Date.now()
}
```

Use objects for complex items with multiple properties.

## Best Practices

1. **Use unique IDs** - Always assign unique identifiers
2. **Validate input** - Check for empty strings before adding
3. **Clear input after adding** - Reset the input field
4. **Use computed properties** - For derived values like counts
5. **Keep state flat** - Avoid deeply nested structures

## See Also

- [t-for](#/docs/directives/t-for) - List rendering
- [t-model](#/docs/directives/t-model) - Two-way binding
- [Counter Example](#/docs/examples/counter) - Simple state management
