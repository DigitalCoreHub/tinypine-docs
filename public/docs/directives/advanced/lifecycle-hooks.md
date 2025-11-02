# Lifecycle Hooks

Hooks to run logic on mount and unmount of components/elements.

---

## Description

TinyPine exposes lifecycle hooks on a component's `t-data` object. Define them as methods to run at specific points in the element's lifetime. In v1.2.0, common hooks include:

- `mounted(el, ctx)` – runs after the element is mounted and the directive tree is initialized.
- `beforeUnmount(el, ctx)` – runs right before removal from the DOM (cleanup opportunity).
- `unmounted(el, ctx)` – runs after the element has been removed.

These hooks have access to the reactive context (`this` points to your component state) and receive the element and a context object.

---

## Usage Examples

### Basic

```html
<div t-data="{
  message: 'Hello',
  mounted(el, ctx) {
    console.log('mounted', el, ctx)
  },
  beforeUnmount(el) {
    console.log('about to unmount')
  },
  unmounted() {
    console.log('unmounted, cleaned up')
  }
}">
  <p t-text="message"></p>
</div>
```

### Cleanup (intervals, listeners)

```html
<div t-data="timer()">
  <p>Elapsed: <span t-text="seconds"></span>s</p>
</div>

<script>
function timer() {
  return {
    seconds: 0,
    handle: null,

    mounted() {
      this.handle = setInterval(() => this.seconds++, 1000)
    },

    beforeUnmount() {
      clearInterval(this.handle)
    }
  }
}
</script>
```

### Türkçe Örnek

```html
<div t-data="{
  mounted() { console.log('montaj tamam') },
  unmounted() { console.log('çıkarıldı') }
}">
  <p t-text="'Merhaba'"></p>
</div>
```

---

## Context Variables

- `$el` – current element instance (also available as first param to hooks)
- `$refs` – references for cleanup (`$refs.input.removeEventListener(...)`)
- `$parent`, `$root` – related scopes to coordinate mount/unmount behavior
- `$store` – if your cleanup affects global listeners or stores

---

## Notes

- Hooks run per element that declares them in its `t-data` scope.
- Prefer `beforeUnmount` to release resources (intervals, observers, subscriptions). `unmounted` is good for logging/analytics.
- Avoid heavy synchronous work in `mounted()`; keep the UI responsive.
- Hooks can coexist with `init()` if your project uses it for early setup; lifecycle hooks focus on DOM presence.
