# t-text

The `t-text` directive sets the text content of an element. It's similar to setting `element.textContent` in vanilla JavaScript.

## Syntax

```html
<element t-text="expression"></element>
```

## Basic Usage

### Simple Text Binding

```html
<div t-data="{ message: 'Hello World!' }">
  <p t-text="message"></p>
</div>
```

<div t-data="{ message: 'Hello World!' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <p t-text="message" class="text-lg text-gray-900 dark:text-white"></p>
</div>

### Dynamic Updates

Text updates automatically when the bound data changes:

```html
<div t-data="{ count: 0 }">
  <button t-click="count++">Increment</button>
  <p t-text="'Count: ' + count"></p>
</div>
```

<div t-data="{ count: 0 }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <button t-click="count++" class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
    Increment
  </button>
  <p t-text="'Count: ' + count" class="text-xl font-bold text-gray-900 dark:text-white">Count: 0</p>
</div>

## String Concatenation

You can concatenate strings and variables:

```html
<div t-data="{ firstName: 'John', lastName: 'Doe' }">
  <p t-text="firstName + ' ' + lastName"></p>
  <p t-text="`${firstName} ${lastName}`"></p>
</div>
```

<div t-data="{ firstName: 'John', lastName: 'Doe' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-2">
  <p t-text="firstName + ' ' + lastName" class="text-gray-900 dark:text-white"></p>
  <p t-text="`Full name: ${firstName} ${lastName}`" class="text-gray-900 dark:text-white font-medium"></p>
</div>

## Computed Values

Use expressions to compute values:

```html
<div t-data="{ price: 100, quantity: 3 }">
  <p t-text="'Total: $' + (price * quantity)"></p>
</div>
```

<div t-data="{ price: 100, quantity: 3 }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <div class="space-y-3">
    <div class="flex gap-4">
      <label class="text-gray-900 dark:text-white">
        Price: $<input t-model="price" type="number" class="w-24 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
      </label>
      <label class="text-gray-900 dark:text-white">
        Quantity: <input t-model="quantity" type="number" class="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
      </label>
    </div>
    <p t-text="'Total: $' + (price * quantity)" class="text-2xl font-bold text-pine-600"></p>
  </div>
</div>

## Conditional Text

Combine with ternary operators:

```html
<div t-data="{ status: 'online' }">
  <p t-text="status === 'online' ? '✓ Connected' : '✗ Disconnected'"></p>
</div>
```

<div t-data="{ status: 'online' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <button t-click="status = status === 'online' ? 'offline' : 'online'" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
    Toggle Status
  </button>
  <p t-text="status === 'online' ? '✓ Connected' : '✗ Disconnected'" class="text-lg font-medium" :class="status === 'online' ? 'text-green-600' : 'text-red-600'"></p>
</div>

## Number Formatting

Format numbers directly in expressions:

```html
<div t-data="{ value: 1234.567 }">
  <p t-text="value.toFixed(2)"></p>
  <p t-text="value.toLocaleString()"></p>
</div>
```

<div t-data="{ value: 1234.567 }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-2">
  <p class="text-gray-900 dark:text-white">Fixed: <span t-text="value.toFixed(2)" class="font-mono text-pine-600"></span></p>
  <p class="text-gray-900 dark:text-white">Locale: <span t-text="value.toLocaleString()" class="font-mono text-pine-600"></span></p>
</div>

## Security

`t-text` automatically escapes HTML, preventing XSS attacks:

```html
<div t-data="{ html: '<script>alert(1)</script>' }">
  <p t-text="html"></p>
</div>
```

The script tag will be displayed as plain text, not executed.

<div t-data="{ html: '<script>alert(1)</script>' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <p class="text-gray-900 dark:text-white">Safe output: <code t-text="html" class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"></code></p>
  <p class="text-sm text-gray-500 mt-2">The script tag is displayed as text, not executed.</p>
</div>

## t-text vs t-html

| Feature | t-text | t-html |
|---------|--------|--------|
| **Safety** | Escapes HTML (safe) | Renders HTML (use with caution) |
| **Performance** | Fast | Slightly slower |
| **Use case** | Plain text | Trusted HTML content |

## Best Practices

### 1. Use for Text Content Only

```html
<!-- Good -->
<p t-text="description"></p>

<!-- Bad: Use t-html for HTML content -->
<p t-text="htmlContent"></p>
```

### 2. Keep Expressions Simple

```html
<!-- Good -->
<p t-text="fullName"></p>

<!-- Better: Use computed property -->
<p t-text="getFullName()"></p>
```

### 3. Prefer Template Literals

```html
<!-- Good -->
<p t-text="`Hello, ${name}!`"></p>

<!-- Less readable -->
<p t-text="'Hello, ' + name + '!'"></p>
```

## Common Patterns

### User Greeting

```javascript
{
  user: { name: 'John' },
  greeting() {
    return `Welcome back, ${this.user.name}!`
  }
}
```

### Date Formatting

```javascript
{
  date: new Date(),
  formattedDate() {
    return this.date.toLocaleDateString()
  }
}
```

### Counter with Label

```javascript
{
  count: 0,
  label() {
    return this.count === 1 ? 'item' : 'items'
  }
}
```

## See Also

- [t-html](#/docs/directives/core/t-html) - Render HTML content
- [t-model](#/docs/directives/core/t-model) - Two-way data binding
- [t-data](#/docs/directives/core/t-data) - Component state
