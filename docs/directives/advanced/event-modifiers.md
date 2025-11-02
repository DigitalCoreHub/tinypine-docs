# Event Modifiers

Enhance event handling with built-in modifiers for common behaviors.

---

## Description

Event modifiers are suffixes you append to event expressions (e.g., in `t-click`) to change how the event is handled. They are applied in the order they appear and can be combined. Supported modifiers in TinyPine v1.2.0:

- `.prevent` – calls `event.preventDefault()`
- `.stop` – calls `event.stopPropagation()`
- `.once` – handler runs only the first time; listener is removed after
- `.outside` – triggers if the click happens outside the element

They work with any `t-*` event directive (e.g., `t-click`, `t-input`, etc.) where applicable.

---

## Usage Examples

### .prevent

```html
<form t-data="{ submit() { /* submit form */ } }" t-submit="submit.prevent">
  <button type="submit">Send</button>
</form>
```

Prevents the browser's default form submission.

### .stop

```html
<div t-click="parent()">
  <button t-click="child.stop">Open</button>
</div>
```

Stops the click from bubbling to the parent.

### .once

```html
<button t-data="{ load() { console.log('Loaded once') } }" t-click="load.once">Load once</button>
```

The handler runs only on the first click.

### .outside

```html
<div t-data="{ open: true, close() { this.open = false } }" class="relative">
  <button t-click="open = !open">Toggle</button>
  <div t-show="open" class="menu" t-click="close.outside">
    <p class="p-2">Menu content</p>
  </div>
</div>
```

Fires when you click outside `.menu`, calling `close()`.

---

## Combined Modifiers

You can combine modifiers as needed:

```html
<button t-click="save.prevent.once">Save</button>
```

The click will prevent default and only execute once.

---

## Context Variables

- `$el` – the bound element, helpful for `.outside` calculations if you implement a custom variant.
- `$refs` – for targeting related nodes (e.g., `$refs.panel`).
- `$parent`, `$root`, `$store` – available for accessing shared data.

---

## Notes

- Order matters: `save.prevent.once` calls `preventDefault()` before running and then removes the listener.
- Accessibility: `.prevent` changes default behavior (e.g., forms/links); ensure keyboard users have equivalent flows.
- Outside clicks: Implementation typically listens on `document` and checks `event.target` is outside `$el`.

---

## Türkçe Örnekler

```html
<!-- .prevent -->
<a href="/paylas" t-click="paylas.prevent">Paylaş</a>

<!-- .stop -->
<div t-click="ebeveyn()">
  <button t-click="cocuk.stop">Tıkla</button>
</div>

<!-- .once -->
<button t-click="yukle.once">Bir kez yükle</button>

<!-- .outside -->
<div t-data="{ acik: true, kapat() { this.acik = false } }">
  <div t-show="acik" class="panel" t-click="kapat.outside">Panel</div>
</div>
```
