# t-text.lang

Displays a translation for the given key from the active i18n locale.

---

## Description

The `t-text.lang` directive renders a localized string by looking up a translation key from the active language context. It works like `t-text`, but instead of evaluating an expression, it resolves a key in your i18n dictionaries. This directive reads from `$lang` and `$store.i18n` (or your configured i18n provider) and updates automatically when the active language changes.

Typical usage:
- Displaying UI labels, messages, and placeholders.
- Reacting to runtime language changes (e.g., a language switcher updates the text live).

The directive is read-only: it does not accept HTML; use `t-html` with safe content if you need markup.

---

## Usage Examples

### Basic

```html
<div t-data="{ $lang: 'en', change() { this.$lang = this.$lang === 'en' ? 'tr' : 'en' } }">
  <h1 t-text.lang="'title.welcome'"></h1>
  <p t-text.lang="'copy.subtitle'"></p>

  <button t-click="change()" class="btn">Switch Language</button>
</div>
```

### With placeholders (interpolation)

```html
<div t-data="{ name: 'Ada' }">
  <p t-text.lang="{ key: 'greeting.named', params: { name } }"></p>
</div>
```

> Implement interpolation in your i18n adapter. A common convention is to accept either a string key or an object with `{ key, params }`.

### Türkçe / English toggle

```html
<div t-data="{
  $lang: 'tr',
  toggle() { this.$lang = this.$lang === 'tr' ? 'en' : 'tr' }
}">
  <button t-click="toggle()">Dili Değiştir / Switch Language</button>
  <span class="ml-2" t-text.lang="'nav.home'"></span>
</div>
```

---

## Context Variables

- `$lang` – current language code (e.g., `en`, `tr`). The directive reacts to changes.
- `$store` – if you keep dictionaries in `$store.i18n`, your i18n adapter can read from there.
- `$root`, `$parent`, `$refs`, `$el` – available as usual but rarely needed here.

---

## Notes

- Data source: You provide an i18n adapter in TinyPine that resolves keys for the current `$lang`.
- Fallback behavior: Define what happens if a key is missing (commonly show the key itself or a fallback language value).
- Safety: `t-text.lang` renders as plain text; for rich content, prefer `t-html` with trusted content.
- Reactivity: When `$lang` updates, all `t-text.lang` bindings re-render automatically.

---

## Example i18n adapter (conceptual)

```js
// Pseudo-code: wire this in app bootstrap
const dictionaries = {
  en: { 'title.welcome': 'Welcome', 'nav.home': 'Home', 'greeting.named': 'Hello, {name}!' },
  tr: { 'title.welcome': 'Hoş geldin', 'nav.home': 'Ana Sayfa', 'greeting.named': 'Merhaba, {name}!' }
}

function t(lang, keyOrObj) {
  const { key, params } = typeof keyOrObj === 'string' ? { key: keyOrObj, params: {} } : keyOrObj
  const template = dictionaries[lang]?.[key] ?? key
  return template.replace(/\{([^}]+)\}/g, (_, k) => String(params?.[k] ?? `{${k}}`))
}
```
