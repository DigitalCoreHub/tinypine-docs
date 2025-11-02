# Counter Example

A simple counter application demonstrating TinyPine's reactive state management.

## Basic Counter

```html
<div t-data="{ count: 0 }">
  <button t-click="count++">Increment</button>
  <span t-text="count"></span>
  <button t-click="count--">Decrement</button>
</div>
```

<div t-data="{ count: 0 }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <div class="flex items-center justify-center gap-4">
    <button t-click="count--" class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-2xl font-bold">
      −
    </button>
    <span t-text="count" class="text-5xl font-bold text-gray-900 dark:text-white min-w-[100px] text-center">0</span>
    <button t-click="count++" class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors text-2xl font-bold">
      +
    </button>
  </div>
</div>

## Counter with Reset

```html
<div t-data="{ count: 0, reset() { this.count = 0 } }">
  <div class="controls">
    <button t-click="count++">+</button>
    <button t-click="count--">-</button>
    <button t-click="reset()">Reset</button>
  </div>
  <p>Count: <span t-text="count"></span></p>
</div>
```

<div t-data="{ count: 0, reset() { this.count = 0 } }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex items-center justify-center gap-3">
    <button t-click="count++" class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors font-medium">
      Increment
    </button>
    <button t-click="count--" class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
      Decrement
    </button>
    <button t-click="reset()" class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
      Reset
    </button>
  </div>
  <p class="text-center text-2xl font-bold text-gray-900 dark:text-white">
    Count: <span t-text="count" class="text-pine-600">0</span>
  </p>
</div>

## Counter with Step

```html
<div t-data="{ count: 0, step: 1 }">
  <label>
    Step:
    <input t-model="step" type="number" min="1" max="10">
  </label>

  <button t-click="count += Number(step)">Add Step</button>
  <button t-click="count -= Number(step)">Subtract Step</button>

  <p>Count: <span t-text="count"></span></p>
</div>
```

<div t-data="{ count: 0, step: 1 }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex items-center justify-center gap-3">
    <label class="flex items-center gap-2 text-gray-900 dark:text-white">
      <span>Step:</span>
      <input t-model="step" type="number" min="1" max="10" class="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    </label>
  </div>

  <div class="flex items-center justify-center gap-3">
    <button t-click="count += Number(step)" class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors font-medium">
      Add <span t-text="step"></span>
    </button>
    <button t-click="count -= Number(step)" class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
      Subtract <span t-text="step"></span>
    </button>
  </div>

  <p class="text-center text-2xl font-bold text-gray-900 dark:text-white">
    Count: <span t-text="count" class="text-pine-600">0</span>
  </p>
</div>

## Advanced Counter with Limits

```html
<div t-data="advancedCounter()">
  <button t-click="increment()" :disabled="count >= max">+</button>
  <button t-click="decrement()" :disabled="count <= min">-</button>

  <p>Count: <span t-text="count"></span></p>
  <p>Min: <span t-text="min"></span> | Max: <span t-text="max"></span></p>

  <p t-show="count >= max" class="warning">Maximum reached!</p>
  <p t-show="count <= min" class="warning">Minimum reached!</p>
</div>

<script>
  function advancedCounter() {
    return {
      count: 0,
      min: 0,
      max: 10,

      increment() {
        if (this.count < this.max) {
          this.count++
        }
      },

      decrement() {
        if (this.count > this.min) {
          this.count--
        }
      }
    }
  }
</script>
```

<div t-data="{ count: 5, min: 0, max: 10, increment() { if (this.count < this.max) this.count++ }, decrement() { if (this.count > this.min) this.count-- } }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex items-center justify-center gap-3">
    <button t-click="decrement()" class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed" :disabled="count <= min">
      −
    </button>
    <span t-text="count" class="text-4xl font-bold text-gray-900 dark:text-white min-w-[80px] text-center">5</span>
    <button t-click="increment()" class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed" :disabled="count >= max">
      +
    </button>
  </div>

  <div class="text-center text-sm text-gray-600 dark:text-gray-400">
    Range: <span t-text="min" class="font-medium">0</span> to <span t-text="max" class="font-medium">10</span>
  </div>

  <div t-show="count >= max" class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-yellow-800 dark:text-yellow-300 text-center">
    ⚠️ Maximum value reached!
  </div>

  <div t-show="count <= min" class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-yellow-800 dark:text-yellow-300 text-center">
    ⚠️ Minimum value reached!
  </div>
</div>

## Multiple Counters

```html
<div t-data="{ counters: [0, 0, 0] }">
  <div t-for="(count, index) in counters" class="counter-item">
    <h4>Counter <span t-text="index + 1"></span></h4>
    <button t-click="counters[index]++">+</button>
    <span t-text="count"></span>
    <button t-click="counters[index]--">-</button>
  </div>

  <p>Total: <span t-text="counters.reduce((a, b) => a + b, 0)"></span></p>
</div>
```

<div t-data="{ counters: [0, 0, 0], total() { return this.counters.reduce((a, b) => a + b, 0) } }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div t-for="(count, index) in counters" class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3">
      <h4 class="text-center font-bold text-gray-900 dark:text-white">Counter <span t-text="index + 1"></span></h4>
      <div class="flex items-center justify-center gap-2">
        <button t-click="counters[index]--" class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
          −
        </button>
        <span t-text="count" class="text-2xl font-bold text-pine-600 min-w-[50px] text-center">0</span>
        <button t-click="counters[index]++" class="px-4 py-2 bg-pine-600 text-white rounded hover:bg-pine-700 transition-colors">
          +
        </button>
      </div>
    </div>
  </div>

  <div class="p-4 bg-pine-50 dark:bg-pine-900/20 border border-pine-200 dark:border-pine-800 rounded-lg">
    <p class="text-center text-xl font-bold text-gray-900 dark:text-white">
      Total: <span t-text="total()" class="text-pine-600">0</span>
    </p>
  </div>
</div>

## Key Concepts

### 1. Reactive State

```javascript
{ count: 0 }
```

The counter value is automatically tracked and updates the DOM when changed.

### 2. Inline Expressions

```html
<button t-click="count++">+</button>
```

Simple operations can be written directly in the template.

### 3. Methods

```javascript
{
  increment() {
    this.count++
  }
}
```

Complex logic should be extracted into methods.

### 4. Computed Values

```javascript
{
  get doubled() {
    return this.count * 2
  }
}
```

Derived values update automatically when dependencies change.

## Best Practices

1. **Keep state minimal** - Only store what's necessary
2. **Use methods for logic** - Don't put complex code in templates
3. **Set initial values** - Always initialize your state
4. **Validate input** - Check bounds and types

## See Also

- [t-data](#/docs/directives/t-data) - Component state
- [t-click](#/docs/directives/t-click) - Event handling
- [Todo List Example](#/docs/examples/todo-list) - More complex state management
