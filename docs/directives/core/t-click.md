# t-click

The `t-click` directive listens for click events and executes JavaScript expressions when triggered.

## Syntax

```html
<button t-click="count++">Click me</button>
```

## Basic Usage

### Simple Expression

```html
<div t-data="{ count: 0 }">
  <button t-click="count++">Clicked: <span t-text="count"></span></button>
</div>
```

<div t-data="{ count: 0 }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <button t-click="count++" class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors text-lg font-medium">
    Clicked: <span t-text="count">0</span> times
  </button>
</div>

### Method Call

Note: In TinyPine ^1.3.0, invoking methods that rely on `this` from inline handlers may lose binding in some contexts. Prefer inline expressions for simple state updates.

```html
<div t-data="{ message: '' }">
  <button t-click="message = 'Hello World!'">Greet</button>
  <p t-text="message"></p>
  </div>
```

<div t-data="{ message: '' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <button t-click="message = 'Hello World!'" class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
    Greet Me
  </button>
  <p t-text="message" class="text-lg font-medium text-gray-900 dark:text-white"></p>
</div>

## Event Object

Access the native event object with `$event`:

```html
<button t-click="handleClick($event)">Click</button>

<script>
  function component() {
    return {
      handleClick(event) {
        console.log('Button clicked:', event.target)
      }
    }
  }
</script>
```

## Multiple Statements

Update multiple visible values with one click (avoid parser-sensitive semicolons):

```html
<div t-data="{ count: 0 }">
  <button t-click="count = count + 1">
    Update
  </button>
  <p>Count: <span t-text="count"></span></p>
  <p>Doubled: <span t-text="count * 2"></span></p>
  <p t-show="count > 0">Updated!</p>
</div>
```

<div t-data="{ count: 0 }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <button t-click="count = count + 1" class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors mb-4">
    Update Both
  </button>
  <div class="space-y-2 text-gray-900 dark:text-white">
    <p>Count: <span t-text="count" class="font-bold text-pine-600">0</span></p>
    <p>Doubled: <span t-text="count * 2" class="font-bold text-pine-600">0</span></p>
    <p t-show="count > 0" class="text-sm text-gray-600 dark:text-gray-300">Updated!</p>
  </div>
</div>

## Toggle Example

Perfect for toggling state:

```html
<div t-data="{ open: false }">
  <button t-click="open = !open">Toggle</button>
  <div t-show="open">
    <p>This content can be toggled!</p>
  </div>
</div>
```

<div t-data="{ open: false }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <button t-click="open = !open" class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
    Toggle Content
  </button>
  <div t-show="open" class="p-4 bg-pine-50 dark:bg-pine-900/20 rounded-lg border border-pine-200 dark:border-pine-800">
    <p class="text-gray-900 dark:text-white">This content can be toggled! Click the button again to hide it.</p>
  </div>
</div>

## Passing Parameters

Pass values directly in expressions:

```html
<div t-data="{ items: [] }">
  <button t-click="items.push('Apple')">Add Apple</button>
  <button t-click="items.push('Banana')">Add Banana</button>
  <ul>
    <li t-for="item in items" t-text="item"></li>
  </ul>
</div>
```

<div t-data="{ items: [] }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2">
    <button t-click="items.push('Apple')" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
      Add Apple 🍎
    </button>
    <button t-click="items.push('Banana')" class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
      Add Banana 🍌
    </button>
    <button t-click="items.push('Orange')" class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
      Add Orange 🍊
    </button>
  </div>
  <ul class="space-y-2">
    <li t-for="item in items" class="p-2 bg-gray-50 dark:bg-gray-700 rounded text-gray-900 dark:text-white">
      <span t-text="item"></span>
    </li>
  </ul>
  <p t-show="items.length === 0" class="text-gray-500 italic">No items yet. Click a button above!</p>
</div>

## Conditional Actions

Use ternary operators for conditional logic:

```html
<div t-data="{ enabled: true, count: 0 }">
  <button t-click="enabled ? count++ : null">
    Count: <span t-text="count"></span>
  </button>
  <button t-click="enabled = !enabled">
    <span t-text="enabled ? 'Disable' : 'Enable'"></span>
  </button>
</div>
```

## Best Practices

### 1. Keep Logic Simple

```html
<!-- Good -->
<button t-click="toggle()">Toggle</button>

<!-- Avoid -->
<button t-click="items.filter(x => x.active).map(x => x.name).join(',')">
  Process
</button>
```

### 2. Use Methods for Complex Logic

```javascript
// Good
{
  complexAction() {
    // Multiple steps
    this.validate()
    this.process()
    this.save()
  }
}
```

### 3. Prevent Default Actions

Use `$event.preventDefault()`:

```html
<form t-click="$event.preventDefault(); submit()">
  <button type="submit">Submit</button>
</form>
```

## Common Patterns

### Counter

```html
<div t-data="{ count: 0 }">
  <button t-click="count++">+</button>
  <span t-text="count"></span>
  <button t-click="count--">-</button>
</div>
```

### Modal Toggle

```javascript
{
  modalOpen: false,
  openModal() {
    this.modalOpen = true
  },
  closeModal() {
    this.modalOpen = false
  }
}
```

### Form Submission

```javascript
{
  form: { email: '', password: '' },
  errors: [],

  submit() {
    this.errors = []
    if (!this.form.email) {
      this.errors.push('Email is required')
    }
    if (this.errors.length === 0) {
      console.log('Submitting:', this.form)
    }
  }
}
```

## See Also

- [t-data](#/docs/directives/t-data) - Component state
- [t-model](#/docs/directives/t-model) - Two-way binding
- [t-show](#/docs/directives/t-show) - Conditional display
