# t-model

The `t-model` directive creates two-way data binding for form inputs. Changes to the input update the data, and changes to the data update the input.

## Syntax

```html
<input t-model="propertyName">
```

## Basic Usage

### Text Input

```html
<div t-data="{ message: 'Hello' }">
  <input t-model="message" type="text">
  <p>You typed: <span t-text="message"></span></p>
</div>
```

<div t-data="{ message: 'Hello TinyPine!' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <input t-model="message" type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
  <p class="text-gray-900 dark:text-white">You typed: <span t-text="message" class="font-bold text-pine-600"></span></p>
</div>

### Number Input

```html
<div t-data="{ age: 25 }">
  <input t-model="age" type="number" min="0" max="120">
  <p>Age: <span t-text="age"></span></p>
</div>
```

<div t-data="{ age: 25 }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <input t-model="age" type="number" min="0" max="120" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
  <p class="text-gray-900 dark:text-white">Age: <span t-text="age" class="font-bold text-pine-600"></span> years old</p>
</div>

### Textarea

```html
<div t-data="{ bio: '' }">
  <textarea t-model="bio" rows="4"></textarea>
  <p>Character count: <span t-text="bio.length"></span></p>
</div>
```

<div t-data="{ bio: '' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <textarea t-model="bio" rows="4" placeholder="Write your bio..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"></textarea>
  <p class="text-gray-900 dark:text-white">Character count: <span t-text="bio.length" class="font-bold text-pine-600"></span></p>
</div>

## Checkbox

### Single Checkbox

```html
<div t-data="{ accepted: false }">
  <label>
    <input t-model="accepted" type="checkbox">
    I accept the terms
  </label>
  <p>Status: <span t-text="accepted ? 'Accepted' : 'Not accepted'"></span></p>
</div>
```

<div t-data="{ accepted: false }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <label class="flex items-center gap-2 text-gray-900 dark:text-white cursor-pointer">
    <input type="checkbox" class="w-5 h-5 text-pine-600" t-click="accepted = !accepted">
    I accept the terms and conditions
  </label>
  <p class="text-gray-900 dark:text-white">
    Status:
    <span t-text="accepted ? 'Accepted ✓' : 'Not accepted ✗'" class="font-bold" t-bind:class="accepted ? 'text-green-600' : 'text-red-600'"></span>
  </p>
</div>

### Multiple Checkboxes

```html
<div t-data="{ selected: [] }">
  <label><input t-model="selected" name="fruits" type="checkbox" value="apple"> Apple</label>
  <label><input t-model="selected" name="fruits" type="checkbox" value="banana"> Banana</label>
  <label><input t-model="selected" name="fruits" type="checkbox" value="orange"> Orange</label>
  <p>Selected:</p>
  <ul>
    <li t-for="item in selected" t-text="item"></li>
  </ul>
  <p t-show="selected.length === 0">None</p>
</div>
```

<div t-data="{ selected: [] }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="space-y-2">
    <label class="flex items-center gap-2 text-gray-900 dark:text-white cursor-pointer">
      <input name="fruits" type="checkbox" value="apple" class="w-5 h-5 text-pine-600"
             t-click="(selected.indexOf('apple') > -1 && selected.splice(selected.indexOf('apple'), 1)) || selected.push('apple')">
      Apple 🍎
    </label>
    <label class="flex items-center gap-2 text-gray-900 dark:text-white cursor-pointer">
      <input name="fruits" type="checkbox" value="banana" class="w-5 h-5 text-pine-600"
             t-click="(selected.indexOf('banana') > -1 && selected.splice(selected.indexOf('banana'), 1)) || selected.push('banana')">
      Banana 🍌
    </label>
    <label class="flex items-center gap-2 text-gray-900 dark:text-white cursor-pointer">
      <input name="fruits" type="checkbox" value="orange" class="w-5 h-5 text-pine-600"
             t-click="(selected.indexOf('orange') > -1 && selected.splice(selected.indexOf('orange'), 1)) || selected.push('orange')">
      Orange 🍊
    </label>
  </div>
  <div class="text-gray-900 dark:text-white">
    <p class="font-medium">Selected:</p>
    <ul class="list-disc ml-6">
      <li t-for="item in selected" class="text-pine-700 dark:text-pine-300"><span t-text="item"></span></li>
    </ul>
    <p t-show="selected.length === 0" class="text-gray-500 italic">None</p>
  </div>
</div>

## Radio Buttons

```html
<div t-data="{ size: 'medium' }">
  <label><input t-model="size" name="size" type="radio" value="small"> Small</label>
  <label><input t-model="size" name="size" type="radio" value="medium"> Medium</label>
  <label><input t-model="size" name="size" type="radio" value="large"> Large</label>
  <p>Selected size: <span t-text="size"></span></p>
</div>
```

<div t-data="{ size: 'medium' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="space-y-2">
    <label class="flex items-center gap-2 text-gray-900 dark:text-white cursor-pointer">
      <input name="size" type="radio" value="small" class="w-5 h-5 text-pine-600" t-click="size = 'small'">
      Small
    </label>
    <label class="flex items-center gap-2 text-gray-900 dark:text-white cursor-pointer">
      <input name="size" type="radio" value="medium" class="w-5 h-5 text-pine-600" checked t-click="size = 'medium'">
      Medium
    </label>
    <label class="flex items-center gap-2 text-gray-900 dark:text-white cursor-pointer">
      <input name="size" type="radio" value="large" class="w-5 h-5 text-pine-600" t-click="size = 'large'">
      Large
    </label>
  </div>
  <p class="text-gray-900 dark:text-white">
    Selected size: <span t-text="size" class="font-bold text-pine-600 uppercase"></span>
  </p>
</div>

## Select Dropdown

### Single Select

```html
<div t-data="{ country: 'us' }">
  <select t-model="country">
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
  </select>
  <p>Selected: <span t-text="country"></span></p>
</div>
```

<div t-data="{ country: 'us' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <select t-model="country" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    <option value="us">🇺🇸 United States</option>
    <option value="uk">🇬🇧 United Kingdom</option>
    <option value="ca">🇨🇦 Canada</option>
    <option value="au">🇦🇺 Australia</option>
  </select>
  <p class="text-gray-900 dark:text-white">
    Selected country code: <span t-text="country" class="font-bold text-pine-600 uppercase"></span>
  </p>
</div>

### Multiple Select

```html
<div t-data="{ colors: [] }">
  <select t-model="colors" multiple size="4">
    <option value="red">Red</option>
    <option value="blue">Blue</option>
    <option value="green">Green</option>
    <option value="yellow">Yellow</option>
  </select>
  <p>Selected: <span t-text="colors.join(', ')"></span></p>
</div>
```

## Real-World Example: Contact Form

```html
<div t-data="contactForm()" class="max-w-md">
  <form>
    <div>
      <label>Name</label>
      <input t-model="form.name" type="text" required>
    </div>

    <div>
      <label>Email</label>
      <input t-model="form.email" type="email" required>
    </div>

    <div>
      <label>Message</label>
      <textarea t-model="form.message" rows="4" required></textarea>
    </div>

    <div>
      <label>
        <input t-model="form.subscribe" type="checkbox">
        Subscribe to newsletter
      </label>
    </div>

    <button type="button" t-click="submit()">Send Message</button>
  </form>

  <div t-show="submitted">
    <p>Thank you, <span t-text="form.name"></span>!</p>
  </div>
</div>

<script>
  function contactForm() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
        subscribe: false
      },
      submitted: false,

      submit() {
        console.log('Form submitted:', this.form)
        this.submitted = true
      }
    }
  }
</script>
```

<div t-data="{ form: { name: '', email: '', message: '', subscribe: false }, submitted: false, submit() { this.submitted = true; setTimeout(() => { this.submitted = false }, 3000) } }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <form class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-900 dark:text-white mb-1">Name</label>
      <input t-model="form.name" type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-900 dark:text-white mb-1">Email</label>
      <input t-model="form.email" type="email" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-900 dark:text-white mb-1">Message</label>
      <textarea t-model="form.message" rows="3" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"></textarea>
    </div>

    <div>
      <label class="flex items-center gap-2 text-gray-900 dark:text-white cursor-pointer">
        <input t-model="form.subscribe" type="checkbox" class="w-5 h-5 text-pine-600">
        Subscribe to newsletter
      </label>
    </div>

    <button type="button" t-click="submit()" class="w-full px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors font-medium">
      Send Message
    </button>
  </form>

  <div t-show="submitted" class="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
    <p class="text-green-800 dark:text-green-300">Thank you<span t-show="form.name" t-text="', ' + form.name"></span>! Your message has been sent.</p>
  </div>
</div>

## Best Practices

### 1. Initialize with Default Values

```javascript
// Good
{
  email: '',
  age: 0,
  accepted: false
}

// Bad
{
  // Uninitialized properties
}
```

### 2. Use Proper Input Types

```html
<!-- Good -->
<input t-model="email" type="email">
<input t-model="age" type="number">
<input t-model="date" type="date">

<!-- Avoid -->
<input t-model="email" type="text">
```

### 3. Group Related Form Data

```javascript
{
  form: {
    name: '',
    email: '',
    password: ''
  }
}
```

## See Also

- [t-data](#/docs/directives/t-data) - Component state
- [t-click](#/docs/directives/t-click) - Event handling
- [Examples: Form](#/docs/examples/form) - Complete form example
