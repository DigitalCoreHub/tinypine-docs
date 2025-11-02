# tp-input Component

Ready-to-use form input components with TinyPine integration.

## Text Input

```html
<div t-data="{ value: '' }">
  <input t-model="value" type="text" class="tp-input" placeholder="Enter text...">
  <p>You typed: <span t-text="value"></span></p>
</div>
```

<div t-data="{ value: '' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <input t-model="value" type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pine-500 focus:border-transparent" placeholder="Enter text...">
  <p class="text-gray-900 dark:text-white">You typed: <span t-text="value || '(nothing yet)'" class="font-medium text-pine-600"></span></p>
</div>

## With Label

```html
<div t-data="{ email: '' }">
  <label class="tp-label">
    Email Address
    <input t-model="email" type="email" class="tp-input" placeholder="you@example.com">
  </label>
</div>
```

<div t-data="{ email: '' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <label class="block">
    <span class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Email Address</span>
    <input t-model="email" type="email" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pine-500 focus:border-transparent" placeholder="you@example.com">
  </label>
</div>

## Input Sizes

```html
<input type="text" class="tp-input tp-input-sm" placeholder="Small">
<input type="text" class="tp-input" placeholder="Medium">
<input type="text" class="tp-input tp-input-lg" placeholder="Large">
```

<div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <input type="text" class="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pine-500 focus:border-transparent" placeholder="Small">
  <input type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pine-500 focus:border-transparent" placeholder="Medium">
  <input type="text" class="w-full px-5 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pine-500 focus:border-transparent" placeholder="Large">
</div>

## With Icons

```html
<div class="relative">
  <div class="absolute left-3 top-1/2 -translate-y-1/2">
    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
  </div>
  <input type="text" class="tp-input pl-10" placeholder="Search...">
</div>
```

<div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <div class="relative">
    <div class="absolute left-3 top-1/2 -translate-y-1/2">
      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </div>
    <input type="text" class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pine-500 focus:border-transparent" placeholder="Search...">
  </div>
</div>

## Validation States

### Error State

```html
<div t-data="{ email: '' }">
  <label class="tp-label">
    Email
    <input t-model="email" type="email" class="tp-input tp-input-error">
    <span class="tp-error-message">Please enter a valid email</span>
  </label>
</div>
```

<div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <label class="block">
    <span class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Email</span>
    <input type="email" class="w-full px-4 py-2 border-2 border-red-500 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent" placeholder="you@example.com">
    <span class="block mt-1 text-sm text-red-600 dark:text-red-400">Please enter a valid email</span>
  </label>
</div>

### Success State

```html
<div>
  <input type="email" class="tp-input tp-input-success" value="valid@email.com">
  <span class="tp-success-message">Email is valid!</span>
</div>
```

<div class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <input type="email" class="w-full px-4 py-2 border-2 border-green-500 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent" value="valid@email.com">
  <span class="block mt-1 text-sm text-green-600 dark:text-green-400">✓ Email is valid!</span>
</div>

## Textarea

```html
<div t-data="{ message: '' }">
  <label class="tp-label">
    Message
    <textarea t-model="message" class="tp-textarea" rows="4" placeholder="Enter your message..."></textarea>
  </label>
  <p>Characters: <span t-text="message.length"></span></p>
</div>
```

<div t-data="{ message: '' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <label class="block">
    <span class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Message</span>
    <textarea t-model="message" rows="4" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pine-500 focus:border-transparent resize-none" placeholder="Enter your message..."></textarea>
  </label>
  <p class="text-sm text-gray-600 dark:text-gray-400">Characters: <span t-text="message.length" class="font-medium text-pine-600">0</span></p>
</div>

## Select Dropdown

```html
<div t-data="{ country: 'us' }">
  <label class="tp-label">
    Country
    <select t-model="country" class="tp-select">
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
    </select>
  </label>
  <p>Selected: <span t-text="country"></span></p>
</div>
```

<div t-data="{ country: 'us' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <label class="block">
    <span class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Country</span>
    <select t-model="country" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-pine-500 focus:border-transparent">
      <option value="us">🇺🇸 United States</option>
      <option value="uk">🇬🇧 United Kingdom</option>
      <option value="ca">🇨🇦 Canada</option>
      <option value="au">🇦🇺 Australia</option>
    </select>
  </label>
  <p class="text-gray-900 dark:text-white">Selected: <span t-text="country" class="font-medium text-pine-600 uppercase"></span></p>
</div>

## Checkbox & Radio

### Checkbox

```html
<div t-data="{ accepted: false }">
  <label class="tp-checkbox">
    <input t-model="accepted" type="checkbox">
    <span>I accept the terms and conditions</span>
  </label>
</div>
```

<div t-data="{ accepted: false }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <label class="flex items-center gap-3 cursor-pointer">
    <input t-model="accepted" type="checkbox" class="w-5 h-5 text-pine-600 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-pine-500">
    <span class="text-gray-900 dark:text-white">I accept the terms and conditions</span>
  </label>
  <p class="mt-3 text-sm" t-text="accepted ? '✓ Terms accepted' : '✗ Please accept terms'" :class="accepted ? 'text-green-600' : 'text-red-600'"></p>
</div>

### Radio Buttons

```html
<div t-data="{ size: 'medium' }">
  <div class="space-y-2">
    <label class="tp-radio">
      <input t-model="size" type="radio" value="small">
      <span>Small</span>
    </label>
    <label class="tp-radio">
      <input t-model="size" type="radio" value="medium">
      <span>Medium</span>
    </label>
    <label class="tp-radio">
      <input t-model="size" type="radio" value="large">
      <span>Large</span>
    </label>
  </div>
</div>
```

<div t-data="{ size: 'medium' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <div class="space-y-2">
    <label class="flex items-center gap-3 cursor-pointer">
      <input t-model="size" type="radio" value="small" class="w-5 h-5 text-pine-600 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-pine-500">
      <span class="text-gray-900 dark:text-white">Small</span>
    </label>
    <label class="flex items-center gap-3 cursor-pointer">
      <input t-model="size" type="radio" value="medium" class="w-5 h-5 text-pine-600 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-pine-500">
      <span class="text-gray-900 dark:text-white">Medium</span>
    </label>
    <label class="flex items-center gap-3 cursor-pointer">
      <input t-model="size" type="radio" value="large" class="w-5 h-5 text-pine-600 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-pine-500">
      <span class="text-gray-900 dark:text-white">Large</span>
    </label>
  </div>
  <p class="text-gray-900 dark:text-white">Selected: <span t-text="size" class="font-medium text-pine-600 uppercase"></span></p>
</div>

## Complete Form Example

```html
<div t-data="formExample()" class="max-w-md">
  <form t-click.prevent="submit()">
    <div class="space-y-4">
      <label class="tp-label">
        Name
        <input t-model="form.name" type="text" class="tp-input" required>
      </label>

      <label class="tp-label">
        Email
        <input t-model="form.email" type="email" class="tp-input" required>
      </label>

      <label class="tp-label">
        Message
        <textarea t-model="form.message" class="tp-textarea" rows="4"></textarea>
      </label>

      <label class="tp-checkbox">
        <input t-model="form.subscribe" type="checkbox">
        <span>Subscribe to newsletter</span>
      </label>

      <button type="submit" class="tp-button w-full">
        Submit
      </button>
    </div>
  </form>
</div>
```

## CSS Classes Reference

```css
/* Input */
.tp-input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg;
  @apply focus:ring-2 focus:ring-pine-500 focus:border-transparent;
  @apply dark:border-gray-600 dark:bg-gray-700 dark:text-white;
}

/* Textarea */
.tp-textarea {
  @apply tp-input resize-none;
}

/* Select */
.tp-select {
  @apply tp-input;
}

/* Label */
.tp-label {
  @apply block text-sm font-medium text-gray-900 dark:text-white mb-2;
}

/* Validation */
.tp-input-error {
  @apply border-red-500 focus:ring-red-500;
}

.tp-input-success {
  @apply border-green-500 focus:ring-green-500;
}
```

## See Also

- [t-model](#/docs/directives/t-model) - Two-way data binding
- [tp-button](#/docs/components/tp-button) - Button component
- [Form Example](#/docs/examples/form) - Complete form example
