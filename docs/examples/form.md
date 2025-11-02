# Form Handling Example

A comprehensive form example demonstrating validation, submission, and state management with TinyPine.

## Simple Contact Form

```html
<div t-data="contactForm()">
  <form t-click.prevent="submit()">
    <label>
      Name
      <input t-model="form.name" type="text" required>
    </label>

    <label>
      Email
      <input t-model="form.email" type="email" required>
    </label>

    <label>
      Message
      <textarea t-model="form.message" required></textarea>
    </label>

    <button type="submit">Send</button>
  </form>

  <div t-show="submitted">
    <p>Thank you for your message!</p>
  </div>
</div>

<script>
  function contactForm() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      },
      submitted: false,

      submit() {
        console.log('Form data:', this.form)
        this.submitted = true
      }
    }
  }
</script>
```

<div t-data="{ form: { name: '', email: '', message: '' }, submitted: false, submit() { this.submitted = true; setTimeout(() => { this.submitted = false; this.form = { name: '', email: '', message: '' } }, 3000) } }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <form t-click.prevent="submit()" class="space-y-4">
    <label class="block">
      <span class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Name</span>
      <input t-model="form.name" type="text" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    </label>

    <label class="block">
      <span class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Email</span>
      <input t-model="form.email" type="email" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    </label>

    <label class="block">
      <span class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Message</span>
      <textarea t-model="form.message" required rows="4" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"></textarea>
    </label>

    <button type="submit" class="w-full px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors font-medium">
      Send Message
    </button>
  </form>

  <div t-show="submitted" class="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
    <p class="text-green-800 dark:text-green-300 font-medium">✓ Thank you! Your message has been sent.</p>
  </div>
</div>

## Form with Validation

```html
<div t-data="validatedForm()">
  <form t-click.prevent="submit()">
    <div>
      <label>Email</label>
      <input t-model="email" type="email" :class="{ 'error': errors.email }">
      <span t-show="errors.email" t-text="errors.email" class="error"></span>
    </div>

    <div>
      <label>Password</label>
      <input t-model="password" type="password" :class="{ 'error': errors.password }">
      <span t-show="errors.password" t-text="errors.password" class="error"></span>
    </div>

    <button type="submit">Submit</button>
  </form>
</div>

<script>
  function validatedForm() {
    return {
      email: '',
      password: '',
      errors: {},

      validate() {
        this.errors = {}

        if (!this.email) {
          this.errors.email = 'Email is required'
        } else if (!this.email.includes('@')) {
          this.errors.email = 'Email must be valid'
        }

        if (!this.password) {
          this.errors.password = 'Password is required'
        } else if (this.password.length < 8) {
          this.errors.password = 'Password must be at least 8 characters'
        }

        return Object.keys(this.errors).length === 0
      },

      submit() {
        if (this.validate()) {
          console.log('Form is valid!', { email: this.email })
          alert('Form submitted successfully!')
        }
      }
    }
  }
</script>
```

<div t-data="{ email: '', password: '', errors: {}, validate() { this.errors = {}; if (!this.email) { this.errors.email = 'Email is required' } else if (!this.email.includes('@')) { this.errors.email = 'Email must be valid' }; if (!this.password) { this.errors.password = 'Password is required' } else if (this.password.length < 8) { this.errors.password = 'Password must be at least 8 characters' }; return Object.keys(this.errors).length === 0 }, submit() { if (this.validate()) { alert('Form submitted successfully!') } } }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <form t-click.prevent="submit()" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Email</label>
      <input t-model="email" type="email" :class="errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'" class="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
      <span t-show="errors.email" t-text="errors.email" class="block mt-1 text-sm text-red-600 dark:text-red-400"></span>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Password</label>
      <input t-model="password" type="password" :class="errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'" class="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
      <span t-show="errors.password" t-text="errors.password" class="block mt-1 text-sm text-red-600 dark:text-red-400"></span>
    </div>

    <button type="submit" class="w-full px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors font-medium">
      Submit
    </button>
  </form>
</div>

## Multi-Step Form

```html
<div t-data="multiStepForm()">
  <!-- Progress -->
  <div class="progress">
    <span t-text="`Step ${step} of 3`"></span>
  </div>

  <!-- Step 1: Personal Info -->
  <div t-show="step === 1">
    <h3>Personal Information</h3>
    <input t-model="form.name" placeholder="Name">
    <input t-model="form.email" placeholder="Email">
    <button t-click="nextStep()">Next</button>
  </div>

  <!-- Step 2: Address -->
  <div t-show="step === 2">
    <h3>Address</h3>
    <input t-model="form.address" placeholder="Street Address">
    <input t-model="form.city" placeholder="City">
    <button t-click="prevStep()">Back</button>
    <button t-click="nextStep()">Next</button>
  </div>

  <!-- Step 3: Review -->
  <div t-show="step === 3">
    <h3>Review & Submit</h3>
    <p>Name: <span t-text="form.name"></span></p>
    <p>Email: <span t-text="form.email"></span></p>
    <p>Address: <span t-text="form.address"></span></p>
    <p>City: <span t-text="form.city"></span></p>
    <button t-click="prevStep()">Back</button>
    <button t-click="submit()">Submit</button>
  </div>
</div>

<script>
  function multiStepForm() {
    return {
      step: 1,
      form: {
        name: '',
        email: '',
        address: '',
        city: ''
      },

      nextStep() {
        if (this.step < 3) {
          this.step++
        }
      },

      prevStep() {
        if (this.step > 1) {
          this.step--
        }
      },

      submit() {
        console.log('Final form data:', this.form)
        alert('Form submitted!')
      }
    }
  }
</script>
```

<div t-data="{ step: 1, form: { name: '', email: '', address: '', city: '' }, nextStep() { if (this.step < 3) this.step++ }, prevStep() { if (this.step > 1) this.step-- }, submit() { alert('Form submitted successfully!'); this.step = 1; this.form = { name: '', email: '', address: '', city: '' } } }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">

  <!-- Progress Bar -->
  <div class="mb-6">
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm font-medium text-gray-900 dark:text-white">Step <span t-text="step"></span> of 3</span>
      <span class="text-sm text-gray-600 dark:text-gray-400" t-text="step === 1 ? 'Personal Info' : step === 2 ? 'Address' : 'Review'"></span>
    </div>
    <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div class="h-full bg-pine-600 transition-all duration-300" :style="`width: ${(step / 3) * 100}%`"></div>
    </div>
  </div>

  <!-- Step 1 -->
  <div t-show="step === 1" class="space-y-4">
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Personal Information</h3>
    <input t-model="form.name" type="text" placeholder="Full Name" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    <input t-model="form.email" type="email" placeholder="Email Address" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    <button t-click="nextStep()" class="w-full px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors font-medium">
      Next →
    </button>
  </div>

  <!-- Step 2 -->
  <div t-show="step === 2" class="space-y-4">
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Address Information</h3>
    <input t-model="form.address" type="text" placeholder="Street Address" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    <input t-model="form.city" type="text" placeholder="City" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    <div class="flex gap-2">
      <button t-click="prevStep()" class="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
        ← Back
      </button>
      <button t-click="nextStep()" class="flex-1 px-6 py-3 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors font-medium">
        Next →
      </button>
    </div>
  </div>

  <!-- Step 3 -->
  <div t-show="step === 3" class="space-y-4">
    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Review & Submit</h3>
    <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
      <p class="text-gray-900 dark:text-white"><strong>Name:</strong> <span t-text="form.name || '(not provided)'"></span></p>
      <p class="text-gray-900 dark:text-white"><strong>Email:</strong> <span t-text="form.email || '(not provided)'"></span></p>
      <p class="text-gray-900 dark:text-white"><strong>Address:</strong> <span t-text="form.address || '(not provided)'"></span></p>
      <p class="text-gray-900 dark:text-white"><strong>City:</strong> <span t-text="form.city || '(not provided)'"></span></p>
    </div>
    <div class="flex gap-2">
      <button t-click="prevStep()" class="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium">
        ← Back
      </button>
      <button t-click="submit()" class="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
        Submit ✓
      </button>
    </div>
  </div>
</div>

## Key Concepts

### 1. Form State Management

```javascript
{
  form: {
    name: '',
    email: '',
    message: ''
  }
}
```

Group related form fields in an object.

### 2. Validation

```javascript
validate() {
  this.errors = {}

  if (!this.email) {
    this.errors.email = 'Email is required'
  }

  return Object.keys(this.errors).length === 0
}
```

### 3. Preventing Default

```html
<form t-click.prevent="submit()">
```

Use `.prevent` modifier to prevent form submission.

### 4. Multi-Step Forms

```javascript
{
  step: 1,
  nextStep() { this.step++ },
  prevStep() { this.step-- }
}
```

## Best Practices

1. **Group form data** - Use a single object for all fields
2. **Validate before submit** - Check all fields before processing
3. **Clear errors on change** - Reset errors when user types
4. **Provide feedback** - Show success/error messages
5. **Disable submit while processing** - Prevent double submissions
6. **Reset form after submit** - Clear fields for next use

## See Also

- [t-model](#/docs/directives/t-model) - Two-way data binding
- [tp-input](#/docs/components/tp-input) - Input components
- [t-click](#/docs/directives/t-click) - Event handling
