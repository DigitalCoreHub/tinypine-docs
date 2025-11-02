# Quick Start

Let's build your first TinyPine component! This guide will walk you through creating a simple todo list app.

## Your First Component

Start with this basic HTML structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>TinyPine Todo App</title>
  <script type="module">
    import 'https://cdn.jsdelivr.net/npm/tinypine@latest/dist/tinypine.js'
  </script>
</head>
<body>

  <div t-data="todoApp()">
    <!-- Component content goes here -->
  </div>

</body>
</html>
```

## Add State and Methods

Define your component's state using `t-data`:

```html
<script>
  function todoApp() {
    return {
      newTodo: '',
      todos: ['Learn TinyPine', 'Build something awesome'],

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

## Build the UI

Now add the template with TinyPine directives:

```html
<div t-data="todoApp()" style="max-width: 500px; margin: 50px auto; padding: 20px;">

  <h1>My Todo List</h1>

  <!-- Input form -->
  <div style="margin-bottom: 20px;">
    <input
      t-model="newTodo"
      type="text"
      placeholder="Add a new todo..."
      style="padding: 10px; width: 70%; border: 1px solid #ddd; border-radius: 4px;"
    >
    <button
      t-click="addTodo()"
      style="padding: 10px 20px; background: #2E7D32; color: white; border: none; border-radius: 4px; cursor: pointer;"
    >
      Add
    </button>
  </div>

  <!-- Todo list -->
  <ul style="list-style: none; padding: 0;">
    <li
      t-for="(todo, index) in todos"
      style="padding: 10px; background: #f5f5f5; margin-bottom: 10px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;"
    >
      <span t-text="todo"></span>
      <button
        t-click="removeTodo(index)"
        style="background: #d32f2f; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;"
      >
        Remove
      </button>
    </li>
  </ul>

  <!-- Empty state -->
  <p t-show="todos.length === 0" style="color: #999; text-align: center;">
    No todos yet. Add one above!
  </p>

</div>
```

## Live Demo

Try it out right here:

<div t-data="{ newTodo: '', todos: ['Learn TinyPine', 'Build something awesome'], addTodo() { if (this.newTodo.trim()) { this.todos.push(this.newTodo); this.newTodo = ''; } }, removeTodo(index) { this.todos.splice(index, 1); } }" class="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">

  <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Todo List</h3>

  <div class="flex gap-2 mb-4">
    <input
      t-model="newTodo"
      type="text"
      placeholder="Add a new todo..."
      class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    >
    <button
      t-click="addTodo()"
      class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors"
    >
      Add
    </button>
  </div>

  <ul class="space-y-2">
    <li
      t-for="(todo, index) in todos"
      class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
    >
      <span t-text="todo" class="text-gray-900 dark:text-white"></span>
      <button
        t-click="removeTodo(index)"
        class="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
      >
        Remove
      </button>
    </li>
  </ul>

  <p t-show="todos.length === 0" class="text-gray-500 text-center py-4">
    No todos yet. Add one above!
  </p>

</div>

## Understanding the Code

Let's break down what's happening:

### 1. State Management

```javascript
{
  newTodo: '',
  todos: ['Learn TinyPine', 'Build something awesome']
}
```

Your component's reactive state. Any changes automatically update the DOM.

### 2. Two-Way Binding

```html
<input t-model="newTodo">
```

The `t-model` directive creates two-way data binding. Type in the input, and `newTodo` updates instantly.

### 3. Event Handling

```html
<button t-click="addTodo()">Add</button>
```

The `t-click` directive handles click events. Call any method from your component.

### 4. List Rendering

```html
<li t-for="(todo, index) in todos">
```

The `t-for` directive loops through arrays and renders elements for each item.

### 5. Conditional Display

```html
<p t-show="todos.length === 0">No todos yet!</p>
```

The `t-show` directive shows/hides elements based on conditions.

## Next Steps

Now that you've built your first component, explore:

- [**Directives**](#/docs/directives/t-data) - Learn all available directives
- [**Components**](#/docs/components/tp-button) - Pre-built components
- [**Examples**](#/docs/examples/counter) - More complex examples

## Best Practices

1. **Keep components small** - One component, one purpose
2. **Name functions clearly** - `addTodo` is better than `add`
3. **Use computed properties** - For derived state
4. **Avoid deep nesting** - Break into smaller components

---

Ready to dive deeper? Check out the [t-data directive](#/docs/directives/t-data) documentation.
