# t-class

The `t-class` directive conditionally applies CSS classes based on reactive expressions. Perfect for dynamic styling based on component state.

## Syntax

```html
<!-- Single class -->
<element t-class:className="condition"></element>

<!-- Multiple classes using object -->
<element :class="{ active: isActive, disabled: isDisabled }"></element>
```

## Basic Usage

### Single Conditional Class

```html
<div t-data="{ isActive: false }">
  <button t-click="isActive = !isActive">Toggle</button>
  <div t-class:active="isActive" class="box">
    Box
  </div>
</div>

<style>
  .box { padding: 1rem; border: 2px solid gray; }
  .box.active { border-color: green; background: lightgreen; }
</style>
```

<div t-data="{ isActive: false }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <button t-click="isActive = !isActive" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
    Toggle Active
  </button>
  <div t-class:active="isActive" class="p-4 border-2 rounded transition-all" :class="isActive ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-600'">
    <span class="font-medium" :class="isActive ? 'text-green-700 dark:text-green-300' : 'text-gray-700 dark:text-gray-300'">
      Status: <span t-text="isActive ? 'Active' : 'Inactive'"></span>
    </span>
  </div>
</div>

### Multiple Conditional Classes

```html
<div t-data="{ isActive: true, hasError: false }">
  <div t-class:active="isActive"
       t-class:error="hasError"
       t-class:valid="isActive && !hasError">
    Content
  </div>
</div>
```

<div t-data="{ isActive: true, hasError: false }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2">
    <button t-click="isActive = !isActive" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      Toggle Active
    </button>
    <button t-click="hasError = !hasError" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
      Toggle Error
    </button>
  </div>

  <div class="p-4 border-2 rounded transition-all"
       :class="{
         'border-green-500 bg-green-50 dark:bg-green-900/20': isActive && !hasError,
         'border-red-500 bg-red-50 dark:bg-red-900/20': hasError,
         'border-gray-300 dark:border-gray-600': !isActive && !hasError
       }">
    <div class="font-medium">
      <span t-show="isActive && !hasError" class="text-green-700 dark:text-green-300">✓ Active & Valid</span>
      <span t-show="!isActive && !hasError" class="text-gray-700 dark:text-gray-300">○ Inactive</span>
      <span t-show="hasError" class="text-red-700 dark:text-red-300">✗ Error State</span>
    </div>
  </div>
</div>

## Tabs Example

```html
<div t-data="{ activeTab: 'home' }">
  <div class="tabs">
    <button t-click="activeTab = 'home'"
            t-class:active="activeTab === 'home'">
      Home
    </button>
    <button t-click="activeTab = 'about'"
            t-class:active="activeTab === 'about'">
      About
    </button>
    <button t-click="activeTab = 'contact'"
            t-class:active="activeTab === 'contact'">
      Contact
    </button>
  </div>
</div>
```

<div t-data="{ activeTab: 'home' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2 border-b border-gray-300 dark:border-gray-600">
    <button t-click="activeTab = 'home'"
            class="px-6 py-3 font-medium transition-all"
            :class="activeTab === 'home' ? 'border-b-2 border-pine-600 text-pine-600 dark:text-pine-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'">
      Home
    </button>
    <button t-click="activeTab = 'about'"
            class="px-6 py-3 font-medium transition-all"
            :class="activeTab === 'about' ? 'border-b-2 border-pine-600 text-pine-600 dark:text-pine-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'">
      About
    </button>
    <button t-click="activeTab = 'contact'"
            class="px-6 py-3 font-medium transition-all"
            :class="activeTab === 'contact' ? 'border-b-2 border-pine-600 text-pine-600 dark:text-pine-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'">
      Contact
    </button>
  </div>

  <div class="p-4">
    <div t-show="activeTab === 'home'" class="text-gray-900 dark:text-white">
      <h3 class="font-bold text-lg mb-2">Home Tab</h3>
      <p>Welcome to the home page!</p>
    </div>
    <div t-show="activeTab === 'about'" class="text-gray-900 dark:text-white">
      <h3 class="font-bold text-lg mb-2">About Tab</h3>
      <p>Learn more about us.</p>
    </div>
    <div t-show="activeTab === 'contact'" class="text-gray-900 dark:text-white">
      <h3 class="font-bold text-lg mb-2">Contact Tab</h3>
      <p>Get in touch with us.</p>
    </div>
  </div>
</div>

## Button States

```html
<div t-data="{ loading: false, success: false, error: false }">
  <button t-click="simulate()">
    Submit
  </button>
</div>

<script>
  function simulate() {
    // Inline simulation - update states directly
    loading = true;
    success = false;
    error = false;
    setTimeout(() => {
      loading = false;
      success = Math.random() > 0.5;
      error = !success;
      setTimeout(() => {
        success = false;
        error = false;
      }, 2000);
    }, 1500);
  }
</script>
```

<div t-data="{
  loading: false,
  success: false,
  error: false
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <button t-click="loading = true"
          class="px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2"
          :class="{
            'bg-pine-600 hover:bg-pine-700 text-white': !loading && !success && !error,
            'bg-gray-400 cursor-wait text-white': loading,
            'bg-green-600 text-white': success,
            'bg-red-600 text-white': error
          }"
          :disabled="loading">
    <span t-show="loading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
    <span t-show="!loading && !success && !error">Submit</span>
    <span t-show="loading">Processing...</span>
    <span t-show="success">✓ Success!</span>
    <span t-show="error">✗ Failed</span>
  </button>
</div>

## Form Validation

```html
<div t-data="{
  email: '',
  get isValid() {
    return this.email.includes('@') && this.email.length > 5
  }
}">
  <input t-model="email"
         t-class:valid="isValid"
         t-class:invalid="email && !isValid">
</div>
```

<div t-data="{
  email: '',
  get isValid() {
    return this.email.includes('@') && this.email.length > 5
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <input t-model="email"
         type="email"
         placeholder="Enter your email..."
         class="w-full px-4 py-2 border-2 rounded-lg transition-all"
         :class="{
           'border-gray-300 dark:border-gray-600': !email,
           'border-green-500 bg-green-50 dark:bg-green-900/20': isValid,
           'border-red-500 bg-red-50 dark:bg-red-900/20': email && !isValid
         }">

  <div t-show="email" class="text-sm">
    <span t-show="isValid" class="text-green-600 dark:text-green-400">✓ Valid email format</span>
    <span t-show="!isValid" class="text-red-600 dark:text-red-400">✗ Invalid email format</span>
  </div>
</div>

## Progress Indicator

```html
<div t-data="{ progress: 0 }">
  <div t-class:complete="progress === 100"
       t-class:in-progress="progress > 0 && progress < 100">
    Progress: <span t-text="progress"></span>%
  </div>
</div>
```

<div t-data="{
  progress: 0
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <button t-click="progress = 10" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
    +10%
  </button>
  <button t-click="progress = 50" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
    50%
  </button>
  <button t-click="progress = 100" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
    100%
  </button>
  <button t-click="progress = 0" class="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
    Reset
  </button>

  <div class="space-y-2">
    <div class="flex justify-between text-sm text-gray-700 dark:text-gray-300">
      <span>Progress</span>
      <span t-text="progress + '%'"></span>
    </div>
    <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
      <div class="h-full rounded-full transition-all duration-300"
           t-bind:style="`width: ${progress}%`"
           t-bind:class="progress > 0 && progress < 100 ? 'bg-blue-500' : (progress === 100 ? 'bg-green-500' : '')">
      </div>
    </div>
    <div t-show="progress === 100" class="text-green-600 dark:text-green-400 font-medium">
      ✓ Complete!
    </div>
  </div>
</div>

## Best Practices

### 1. Use Descriptive Class Names

```html
<!-- Good -->
<div t-class:is-loading="loading"></div>

<!-- Avoid -->
<div t-class:l="loading"></div>
```

### 2. Combine with Static Classes

```html
<!-- Base classes remain, conditional classes toggle -->
<button class="btn" t-class:btn-primary="isPrimary">
  Button
</button>
```

### 3. Use Computed Properties for Complex Logic

```javascript
{
  status: 'pending',
  get statusClass() {
    return {
      'bg-yellow-500': this.status === 'pending',
      'bg-green-500': this.status === 'success',
      'bg-red-500': this.status === 'error'
    }
  }
}
```

## Common Patterns

### Dark Mode Toggle

```javascript
{
  isDark: false,
  themeClass() {
    return this.isDark ? 'dark' : 'light'
  }
}
```

### Dropdown Menu

```javascript
{
  isOpen: false,
  menuClass() {
    return {
      'visible': this.isOpen,
      'hidden': !this.isOpen
    }
  }
}
```

### Card States

```javascript
{
  status: 'default', // 'default', 'hover', 'active', 'disabled'
  cardClass() {
    return {
      'card-hover': this.status === 'hover',
      'card-active': this.status === 'active',
      'card-disabled': this.status === 'disabled'
    }
  }
}
```

## See Also

- [t-show](#/docs/directives/core/t-show) - Toggle visibility
- [t-if](#/docs/directives/structural/t-if) - Conditional rendering
- [t-bind](#/docs/directives/structural/t-bind) - Dynamic attributes
