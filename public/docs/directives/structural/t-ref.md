# t-ref

The `t-ref` directive creates references to DOM elements, making them accessible via `$refs` in your component. Perfect for direct DOM manipulation when needed.

## Syntax

```html
<element t-ref="referenceName"></element>

<!-- Access in code -->
$refs.referenceName
```

## Basic Usage

### Simple Reference

```html
<div t-data="{
  focusInput() {
    $refs.emailInput.focus()
  }
}">
  <input t-ref="emailInput" placeholder="Email">
  <button t-click="focusInput()">Focus Input</button>
</div>
```

<div t-data="{
  focusInput() {
    const input = document.querySelector('[t-ref=emailInput]')
    if (input) input.focus()
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <input t-ref="emailInput" placeholder="Enter your email..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
  <button t-click="focusInput()" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
    Focus Input
  </button>
</div>

### Multiple References

```html
<div t-data="{
  scrollToSection(ref) {
    $refs[ref].scrollIntoView({ behavior: 'smooth' })
  }
}">
  <button t-click="scrollToSection('section1')">Go to Section 1</button>
  <button t-click="scrollToSection('section2')">Go to Section 2</button>

  <div t-ref="section1">Section 1</div>
  <div t-ref="section2">Section 2</div>
</div>
```

<div t-data="{
  scrollToSection(ref) {
    const el = document.querySelector(`[t-ref='${ref}']`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <div class="flex gap-2 mb-4 sticky top-0 bg-white dark:bg-gray-800 py-2">
    <button t-click="scrollToSection('intro')" class="px-4 py-2 bg-pine-600 text-white rounded hover:bg-pine-700">Intro</button>
    <button t-click="scrollToSection('content')" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Content</button>
    <button t-click="scrollToSection('footer')" class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Footer</button>
  </div>

  <div class="space-y-4 max-h-64 overflow-y-auto">
    <div t-ref="intro" class="p-6 bg-pine-100 dark:bg-pine-900/20 rounded-lg">
      <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Introduction</h3>
      <p class="text-gray-700 dark:text-gray-300">This is the introduction section. Scroll to see other sections!</p>
    </div>

    <div class="h-32"></div>

    <div t-ref="content" class="p-6 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
      <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Main Content</h3>
      <p class="text-gray-700 dark:text-gray-300">This is the main content section with important information.</p>
    </div>

    <div class="h-32"></div>

    <div t-ref="footer" class="p-6 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
      <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">Footer</h3>
      <p class="text-gray-700 dark:text-gray-300">This is the footer section at the bottom.</p>
    </div>
  </div>
</div>

## Form Validation

Access form inputs for validation:

```html
<div t-data="{
  validate() {
    if ($refs.password.value !== $refs.confirm.value) {
      alert('Passwords do not match!')
    }
  }
}">
  <input t-ref="password" type="password" placeholder="Password">
  <input t-ref="confirm" type="password" placeholder="Confirm">
  <button t-click="validate()">Submit</button>
</div>
```

<div t-data="{
  password: '',
  confirm: '',
  error: '',
  validate() {
    if (this.password !== this.confirm) {
      this.error = 'Passwords do not match!'
    } else if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters!'
    } else {
      this.error = ''
      alert('Form is valid!')
    }
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <input t-model="password" t-ref="password" type="password" placeholder="Password" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
  <input t-model="confirm" t-ref="confirm" type="password" placeholder="Confirm Password" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">

  <div t-show="error" class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded">
    <p t-text="error" class="text-red-700 dark:text-red-300"></p>
  </div>

  <button t-click="validate()" class="w-full px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
    Validate & Submit
  </button>
</div>

## Canvas Manipulation

Direct access to canvas element:

```html
<div t-data="{
  init() {
    const ctx = $refs.canvas.getContext('2d')
    ctx.fillStyle = 'blue'
    ctx.fillRect(10, 10, 100, 100)
  }
}">
  <canvas t-ref="canvas" width="200" height="150"></canvas>
</div>
```

<div t-data="{}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <canvas t-ref="myCanvas" width="300" height="150" class="border border-gray-300 dark:border-gray-600 rounded-lg"></canvas>
  <button t-click="(function() { const c = document.querySelector('[t-ref=myCanvas]'); if (!c) return; const ctx = c.getContext('2d'); ctx.clearRect(0, 0, c.width, c.height); const g = ctx.createLinearGradient(0, 0, c.width, 0); g.addColorStop(0, '#2E7D32'); g.addColorStop(1, '#A5D6A7'); ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height); ctx.fillStyle = 'white'; ctx.font = 'bold 24px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('TinyPine', c.width / 2, c.height / 2 + 8); })()" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
    Draw Canvas
  </button>
</div>

## Video/Audio Control

Control media elements:

```html
<div t-data="{
  play() { $refs.video.play() },
  pause() { $refs.video.pause() },
  restart() {
    $refs.video.currentTime = 0
    $refs.video.play()
  }
}">
  <video t-ref="video" src="video.mp4"></video>
  <button t-click="play()">Play</button>
  <button t-click="pause()">Pause</button>
  <button t-click="restart()">Restart</button>
</div>
```

## File Input

Access file input for uploads:

```html
<div t-data="{
  fileName: ''
}">
  <input t-ref="fileInput" type="file" onchange="fileName = this.files[0]?.name || ''">
  <p t-show="fileName" t-text="'Selected: ' + fileName"></p>
</div>
```

<div t-data="{
  fileName: '',
  fileSize: 0
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <input t-ref="fileInput" type="file" onchange="(function(e) { const input = e.target; if (input && input.files && input.files[0]) { const scope = input.closest('[t-data]'); if (scope && scope._tinypineScope) { scope._tinypineScope.fileName = input.files[0].name; scope._tinypineScope.fileSize = (input.files[0].size / 1024).toFixed(2); } } })(event)" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-pine-600 file:text-white file:cursor-pointer">

  <div t-show="fileName" class="p-3 bg-pine-50 dark:bg-pine-900/20 border border-pine-200 dark:border-pine-800 rounded">
    <p class="text-gray-900 dark:text-white">
      <strong>File:</strong> <span t-text="fileName"></span><br>
      <strong>Size:</strong> <span t-text="fileSize"></span> KB
    </p>
  </div>
</div>

## Text Selection

Get selected text from textarea:

```html
<div t-data="{
  getSelection() {
    const el = $refs.textarea
    const text = el.value.substring(el.selectionStart, el.selectionEnd)
    console.log('Selected:', text)
  }
}">
  <textarea t-ref="textarea"></textarea>
  <button t-click="getSelection()">Get Selection</button>
</div>
```

<div t-data="{
  text: 'Select some text here and click the button!',
  selected: '',
  getSelection() {
    const el = document.querySelector('[t-ref=myTextarea]')
    if (el) {
      this.selected = el.value.substring(el.selectionStart, el.selectionEnd)
    }
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-3">
  <textarea t-model="text" t-ref="myTextarea" rows="3" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"></textarea>

  <button t-click="getSelection()" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
    Get Selected Text
  </button>

  <div t-show="selected" class="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
    <p class="text-gray-900 dark:text-white">
      <strong>You selected:</strong> "<span t-text="selected" class="text-yellow-700 dark:text-yellow-300 font-medium"></span>"
    </p>
  </div>
</div>

## Best Practices

### 1. Use Descriptive Names

```html
<!-- Good -->
<input t-ref="emailInput">
<div t-ref="modalContainer">

<!-- Avoid -->
<input t-ref="i1">
<div t-ref="d">
```

### 2. Check Existence Before Use

```javascript
// Good: Safe access
if ($refs.myElement) {
  $refs.myElement.focus()
}

// Bad: May throw error
$refs.myElement.focus()
```

### 3. Prefer Reactive State Over Direct DOM

```html
<!-- Prefer reactive approach -->
<div t-data="{ isOpen: false }">
  <div t-show="isOpen">Content</div>
</div>

<!-- Avoid direct DOM when possible -->
<div t-data="{ toggle() { $refs.content.classList.toggle('hidden') } }">
  <div t-ref="content">Content</div>
</div>
```

## Common Patterns

### Auto-focus on Mount

```javascript
{
  mounted() {
    $refs.firstInput.focus()
  }
}
```

### Copy to Clipboard

```javascript
{
  copyText() {
    $refs.codeBlock.select()
    document.execCommand('copy')
  }
}
```

### Measure Element Size

```javascript
{
  getSize() {
    const rect = $refs.box.getBoundingClientRect()
    return { width: rect.width, height: rect.height }
  }
}
```

## When to Use t-ref

### ✅ Good Use Cases

- Focusing inputs
- Measuring element dimensions
- Canvas/video/audio manipulation
- Integration with third-party libraries
- Complex animations via direct DOM access

### ❌ Avoid When

- Simple text updates (use `t-text`)
- Class toggling (use `t-class`)
- Showing/hiding (use `t-show`)
- Most reactive scenarios (use state)

## See Also

- [t-init](#/docs/directives/structural/t-init) - Initialization hook
- [Lifecycle Hooks](#/docs/directives/advanced/lifecycle-hooks) - Component lifecycle
- [t-data](#/docs/directives/core/t-data) - Component state
