# t-transition

The `t-transition` directive adds CSS transitions and animations when elements enter or leave the DOM. Perfect for creating smooth, polished user interfaces.

## Syntax

```html
<element t-transition="transitionName"></element>
```

## Basic Usage

### Simple Fade

```html
<div t-data="{ show: false }">
  <button t-click="show = !show">Toggle</button>
  <div t-show="show" t-transition="fade">
    Fading content
  </div>
</div>
```

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

<div t-data="{ show: false }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <button t-click="show = !show" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700">
    Toggle Fade
  </button>

  <div t-show="show" class="p-4 bg-pine-50 dark:bg-pine-900/20 border border-pine-200 dark:border-pine-800 rounded transition-opacity duration-300" :style="show ? 'opacity: 1' : 'opacity: 0'">
    <p class="text-gray-900 dark:text-white">This content fades in and out smoothly</p>
  </div>
</div>

### Slide Down

```html
<div t-data="{ open: false }">
  <button t-click="open = !open">Expand</button>
  <div t-show="open" t-transition="slide">
    Sliding content
  </div>
</div>
```

<div t-data="{ open: false }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <button t-click="open = !open" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    <span t-show="!open">▼ Expand</span>
    <span t-show="open">▲ Collapse</span>
  </button>

  <div t-show="open" class="overflow-hidden transition-all duration-300" :style="open ? 'max-height: 200px; opacity: 1' : 'max-height: 0; opacity: 0'">
    <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded">
      <p class="text-gray-900 dark:text-white">This content slides down smoothly when expanded</p>
    </div>
  </div>
</div>

## Transition Types

### Scale

```html
<div t-show="show" t-transition="scale">
  Scaling content
</div>
```

<div t-data="{ show: false }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <button t-click="show = !show" class="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
    Toggle Scale
  </button>

  <div t-show="show" class="flex justify-center">
    <div class="p-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg transform transition-all duration-300" :style="show ? 'transform: scale(1); opacity: 1' : 'transform: scale(0.8); opacity: 0'">
      <p class="text-gray-900 dark:text-white font-medium">This content scales up!</p>
    </div>
  </div>
</div>

### Slide from Side

```html
<div t-show="show" t-transition="slide-left">
  Content sliding from left
</div>
```

<div t-data="{ show: false }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <button t-click="show = !show" class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
    Toggle Slide
  </button>

  <div class="overflow-hidden">
    <div t-show="show" class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg transform transition-all duration-300" :style="show ? 'transform: translateX(0); opacity: 1' : 'transform: translateX(-100%); opacity: 0'">
      <p class="text-gray-900 dark:text-white">Sliding in from the left!</p>
    </div>
  </div>
</div>

### Bounce

```html
<div t-show="show" t-transition="bounce">
  Bouncing content
</div>
```

<div t-data="{ show: false }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <button t-click="show = !show" class="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
    Toggle Bounce
  </button>

  <div t-show="show" class="flex justify-center">
    <div class="p-6 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg" :class="show ? 'animate-bounce' : ''">
      <p class="text-gray-900 dark:text-white font-medium">🎉 Bouncing!</p>
    </div>
  </div>
</div>

## Modal Transitions

Smooth modal animations:

```html
<div t-data="{ isOpen: false }">
  <button t-click="isOpen = true">Open Modal</button>

  <div t-show="isOpen" t-transition="fade" class="modal-overlay">
    <div t-transition="scale" class="modal-content">
      <h2>Modal Title</h2>
      <p>Modal content here</p>
      <button t-click="isOpen = false">Close</button>
    </div>
  </div>
</div>
```

<div t-data="{ isOpen: false }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <button t-click="isOpen = true" class="px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700">
    Open Modal
  </button>

  <div t-show="isOpen" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300" :style="isOpen ? 'opacity: 1' : 'opacity: 0'" t-click="isOpen = false">
    <div class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 transform transition-all duration-300" :style="isOpen ? 'transform: scale(1); opacity: 1' : 'transform: scale(0.9); opacity: 0'" t-click.stop="">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Modal Title</h2>
      <p class="text-gray-700 dark:text-gray-300 mb-6">This is a beautiful modal with smooth transitions. Click the overlay or the close button to dismiss.</p>
      <button t-click="isOpen = false" class="w-full px-4 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700">
        Close Modal
      </button>
    </div>
  </div>
</div>

## Dropdown Menu

Animated dropdown:

```html
<div t-data="{ open: false }">
  <button t-click="open = !open">Menu</button>

  <div t-show="open" t-transition="fade-scale">
    <a href="#">Option 1</a>
    <a href="#">Option 2</a>
    <a href="#">Option 3</a>
  </div>
</div>
```

<div t-data="{ open: false }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 relative">
  <button t-click="open = !open" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700">
    Menu ▼
  </button>

  <div t-show="open" class="absolute top-full mt-2 left-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg overflow-hidden z-10 transition-all duration-200" :style="open ? 'transform: scale(1); opacity: 1' : 'transform: scale(0.95); opacity: 0'">
    <a href="#" class="block px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white">Option 1</a>
    <a href="#" class="block px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white">Option 2</a>
    <a href="#" class="block px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white">Option 3</a>
  </div>
</div>

## Notification Toast

Slide-in notifications:

```html
<div t-data="{
  toasts: [],
  addToast() {
    const id = Date.now()
    this.toasts.push({ id, message: 'Notification!' })
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id)
    }, 3000)
  }
}">
  <button t-click="addToast()">Show Notification</button>

  <div t-for="toast in toasts" t-transition="slide-right">
    <p t-text="toast.message"></p>
  </div>
</div>
```

<div t-data="{
  toasts: [],
  addToast(type) {
    const messages = {
      success: { icon: '✓', text: 'Action completed successfully!', color: 'green' },
      info: { icon: 'ℹ', text: 'Here is some information', color: 'blue' },
      warning: { icon: '⚠', text: 'Warning: Please be careful', color: 'yellow' },
      error: { icon: '✕', text: 'Error: Something went wrong', color: 'red' }
    }
    const id = Date.now()
    this.toasts.push({ id, ...messages[type] })
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id)
    }, 3000)
  },
  removeToast(id) {
    this.toasts = this.toasts.filter(t => t.id !== id)
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="grid grid-cols-4 gap-2">
    <button t-click="addToast('success')" class="px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700">
      Success
    </button>
    <button t-click="addToast('info')" class="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
      Info
    </button>
    <button t-click="addToast('warning')" class="px-3 py-2 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700">
      Warning
    </button>
    <button t-click="addToast('error')" class="px-3 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700">
      Error
    </button>
  </div>

  <div class="fixed top-4 right-4 space-y-2 z-50" style="max-width: 320px;">
    <div t-for="toast in toasts" :class="'bg-' + toast.color + '-600'" class="text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transform transition-all duration-300" :style="'transform: translateX(0); opacity: 1'">
      <span class="text-xl font-bold" t-text="toast.icon"></span>
      <p t-text="toast.text" class="flex-1"></p>
      <button t-click="removeToast(toast.id)" class="text-white hover:text-gray-200">✕</button>
    </div>
  </div>

  <p class="text-sm text-gray-500 dark:text-gray-400">
    Notifications slide in from the right
  </p>
</div>

## List Transitions

Animate list items:

```html
<div t-data="{
  items: ['Item 1', 'Item 2', 'Item 3'],
  addItem() {
    this.items.push(`Item ${this.items.length + 1}`)
  },
  removeItem(index) {
    this.items.splice(index, 1)
  }
}">
  <button t-click="addItem()">Add Item</button>

  <div t-for="(item, index) in items" t-transition="fade">
    <span t-text="item"></span>
    <button t-click="removeItem(index)">Remove</button>
  </div>
</div>
```

<div t-data="{
  items: ['Item 1', 'Item 2', 'Item 3'],
  addItem() {
    this.items.push(`Item ${this.items.length + 1}`)
  },
  removeItem(index) {
    this.items.splice(index, 1)
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <button t-click="addItem()" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700">
    + Add Item
  </button>

  <div class="space-y-2">
    <div t-for="(item, index) in items" class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600">
      <span t-text="item" class="text-gray-900 dark:text-white font-medium"></span>
      <button t-click="removeItem(index)" class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm">
        Remove
      </button>
    </div>
  </div>
</div>

## Tab Transitions

Smooth tab switching:

```html
<div t-data="{ activeTab: 'tab1' }">
  <button t-click="activeTab = 'tab1'">Tab 1</button>
  <button t-click="activeTab = 'tab2'">Tab 2</button>
  <button t-click="activeTab = 'tab3'">Tab 3</button>

  <div t-show="activeTab === 'tab1'" t-transition="fade">
    Tab 1 content
  </div>
  <div t-show="activeTab === 'tab2'" t-transition="fade">
    Tab 2 content
  </div>
  <div t-show="activeTab === 'tab3'" t-transition="fade">
    Tab 3 content
  </div>
</div>
```

<div t-data="{ activeTab: 'home' }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2 border-b border-gray-200 dark:border-gray-700">
    <button t-click="activeTab = 'home'" :class="activeTab === 'home' ? 'border-pine-600 text-pine-600' : 'border-transparent text-gray-600 dark:text-gray-400'" class="px-4 py-2 border-b-2 font-medium transition-colors hover:text-pine-600">
      Home
    </button>
    <button t-click="activeTab = 'profile'" :class="activeTab === 'profile' ? 'border-pine-600 text-pine-600' : 'border-transparent text-gray-600 dark:text-gray-400'" class="px-4 py-2 border-b-2 font-medium transition-colors hover:text-pine-600">
      Profile
    </button>
    <button t-click="activeTab = 'settings'" :class="activeTab === 'settings' ? 'border-pine-600 text-pine-600' : 'border-transparent text-gray-600 dark:text-gray-400'" class="px-4 py-2 border-b-2 font-medium transition-colors hover:text-pine-600">
      Settings
    </button>
  </div>

  <div class="relative">
    <div t-show="activeTab === 'home'" class="p-4 bg-pine-50 dark:bg-pine-900/20 border border-pine-200 dark:border-pine-800 rounded-lg transition-opacity duration-300" :style="activeTab === 'home' ? 'opacity: 1' : 'opacity: 0'">
      <h3 class="font-bold text-gray-900 dark:text-white mb-2">Home Content</h3>
      <p class="text-gray-700 dark:text-gray-300">Welcome to the home tab! This is where your main content lives.</p>
    </div>

    <div t-show="activeTab === 'profile'" class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg transition-opacity duration-300" :style="activeTab === 'profile' ? 'opacity: 1' : 'opacity: 0'">
      <h3 class="font-bold text-gray-900 dark:text-white mb-2">Profile Content</h3>
      <p class="text-gray-700 dark:text-gray-300">Your profile information and settings are displayed here.</p>
    </div>

    <div t-show="activeTab === 'settings'" class="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg transition-opacity duration-300" :style="activeTab === 'settings' ? 'opacity: 1' : 'opacity: 0'">
      <h3 class="font-bold text-gray-900 dark:text-white mb-2">Settings Content</h3>
      <p class="text-gray-700 dark:text-gray-300">Manage your application settings and preferences here.</p>
    </div>
  </div>
</div>

## Custom Transitions

Define your own transitions with CSS:

```css
.custom-enter-active,
.custom-leave-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.custom-enter-from {
  transform: translateY(-100px) rotate(-45deg);
  opacity: 0;
}

.custom-leave-to {
  transform: translateY(100px) rotate(45deg);
  opacity: 0;
}
```

```html
<div t-show="show" t-transition="custom">
  Custom transition
</div>
```

<div t-data="{ show: false }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <button t-click="show = !show" class="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
    Toggle Custom
  </button>

  <div class="flex justify-center min-h-[100px] items-center">
    <div t-show="show" class="p-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg shadow-lg transform transition-all duration-500" :style="show ? 'transform: translateY(0) rotate(0deg); opacity: 1' : 'transform: translateY(-50px) rotate(-45deg); opacity: 0'">
      <p class="font-bold text-xl">✨ Custom Transition!</p>
    </div>
  </div>
</div>

## Best Practices

### 1. Keep Transitions Short

```css
/* Good: Quick and snappy */
.fade-enter-active {
  transition: opacity 0.2s;
}

/* Avoid: Too slow */
.fade-enter-active {
  transition: opacity 2s;
}
```

### 2. Use Appropriate Easing

```css
/* Smooth acceleration */
transition: all 0.3s ease-out;

/* Bounce effect */
transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### 3. Optimize Performance

```css
/* Good: Use transform and opacity */
.slide-enter-active {
  transition: transform 0.3s, opacity 0.3s;
}

/* Avoid: Animating layout properties */
.slide-enter-active {
  transition: left 0.3s, width 0.3s;
}
```

## See Also

- [t-show](#/docs/directives/core/t-show) - Conditional visibility
- [t-if](#/docs/directives/structural/t-if) - Conditional rendering
- [t-class](#/docs/directives/core/t-class) - Dynamic classes
