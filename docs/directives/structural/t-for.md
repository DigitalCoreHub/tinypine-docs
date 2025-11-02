# t-for

The `t-for` directive renders a list of elements by iterating over an array or object.

## Syntax

```html
<!-- Array iteration -->
<li t-for="item in items" t-text="item"></li>

<!-- With index -->
<li t-for="(item, index) in items" t-text="`${index}: ${item}`"></li>

<!-- Object iteration -->
<div t-for="(value, key) in object" t-text="`${key}: ${value}`"></div>
```

## Array Iteration

### Basic List

```html
<div t-data="{ fruits: ['Apple', 'Banana', 'Orange'] }">
  <ul>
    <li t-for="fruit in fruits" t-text="fruit"></li>
  </ul>
</div>
```

<div t-data="{ fruits: ['Apple', 'Banana', 'Orange'] }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <ul class="space-y-2">
    <li t-for="(fruit, index) in fruits" class="p-2 bg-gray-50 dark:bg-gray-700 rounded text-gray-900 dark:text-white">
      <span t-text="fruits[index]"></span>
    </li>
  </ul>
</div>

### With Index

```html
<div t-data="{ items: ['First', 'Second', 'Third'] }">
  <ol>
    <li t-for="(item, index) in items" t-text="`${index + 1}. ${item}`"></li>
  </ol>
</div>
```

<div t-data="{ items: ['First', 'Second', 'Third'] }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <ol class="space-y-2">
    <li t-for="(item, index) in items" class="p-2 bg-gray-50 dark:bg-gray-700 rounded text-gray-900 dark:text-white">
      <span t-text="`${index + 1}. ${items[index]}`"></span>
    </li>
  </ol>
</div>

## Array of Objects

```html
<div t-data="{ users: [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
] }">
  <div t-for="user in users">
    <p><strong t-text="user.name"></strong> - <span t-text="user.age"></span> years old</p>
  </div>
</div>
```

<div t-data="{ users: [
  { name: 'Alice', age: 25, role: 'Designer' },
  { name: 'Bob', age: 30, role: 'Developer' },
  { name: 'Charlie', age: 35, role: 'Manager' }
] }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <div class="space-y-3">
    <div t-for="user in users" class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <p class="text-gray-900 dark:text-white">
        <strong t-text="user.name" class="text-pine-600 dark:text-pine-400"></strong> -
        <span t-text="user.age"></span> years old
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-400" t-text="user.role"></p>
    </div>
  </div>
</div>

## Object Iteration

```html
<div t-data="{ config: { host: 'localhost', port: 3000, debug: true } }">
  <dl>
    <div t-for="(value, key) in config">
      <dt t-text="key"></dt>
      <dd t-text="value"></dd>
    </div>
  </dl>
</div>
```

<div t-data="{
  configItems: [
    { key: 'host', value: 'localhost' },
    { key: 'port', value: 3000 },
    { key: 'debug', value: true },
    { key: 'env', value: 'development' }
  ]
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6">
  <dl class="space-y-2">
    <div t-for="item in configItems" class="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
      <dt class="font-medium text-gray-900 dark:text-white capitalize"><span t-text="item.key"></span></dt>
      <dd class="text-gray-600 dark:text-gray-400"><span t-text="item.value"></span></dd>
    </div>
  </dl>
</div>

## Dynamic Lists

### Adding Items

```html
<div t-data="todoList()">
  <input t-model="newItem" type="text" placeholder="Add item">
  <button t-click="addItem()">Add</button>

  <ul>
    <li t-for="(item, index) in items">
      <span t-text="item"></span>
      <button t-click="removeItem(index)">Remove</button>
    </li>
  </ul>
</div>

<script>
  function todoList() {
    return {
      newItem: '',
      items: ['Task 1', 'Task 2'],

      addItem() {
        if (this.newItem.trim()) {
          this.items.push(this.newItem)
          this.newItem = ''
        }
      },

      removeItem(index) {
        this.items.splice(index, 1)
      }
    }
  }
</script>
```

<div t-data="{ newItem: '', items: ['Task 1', 'Task 2'] }" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2">
    <input t-model="newItem" type="text" placeholder="Add new task..." class="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
    <button t-click="newItem.trim() && (items.push(newItem) && (newItem = ''))" class="px-6 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
      Add
    </button>
  </div>

  <ul class="space-y-2">
    <li t-for="(item, index) in items" class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <span t-text="items[index]" class="text-gray-900 dark:text-white"></span>
      <button t-click="items.splice(index, 1)" class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm">
        Remove
      </button>
    </li>
  </ul>
</div>

## Filtering Lists

```html
<div t-data="{
  searchTerm: '',
  items: ['Apple', 'Banana', 'Cherry', 'Date'],
  get filteredItems() {
    return this.items.filter(item =>
      item.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  }
}">
  <input t-model="searchTerm" placeholder="Search...">
  <ul>
    <li t-for="item in filteredItems" t-text="item"></li>
  </ul>
</div>
```

<div t-data="{
  searchTerm: '',
  items: ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'],
  get filteredItems() {
    return this.items.filter(item =>
      item.toLowerCase().includes(this.searchTerm.toLowerCase())
    )
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <input t-model="searchTerm" placeholder="Search fruits..." class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">

  <ul class="space-y-2">
    <li t-for="(item, index) in filteredItems" class="p-2 bg-gray-50 dark:bg-gray-700 rounded text-gray-900 dark:text-white">
      <span t-text="filteredItems[index]"></span>
    </li>
  </ul>

  <p t-show="filteredItems.length === 0" class="text-gray-500 italic text-center">No results found</p>
</div>

## Sorting Lists

```html
<div t-data="{
  items: [
    { name: 'Banana', price: 2 },
    { name: 'Apple', price: 1 },
    { name: 'Cherry', price: 3 }
  ],
  sortBy: 'name',
  get sortedItems() {
    return [...this.items].sort((a, b) => {
      return a[this.sortBy] > b[this.sortBy] ? 1 : -1
    })
  }
}">
  <button t-click="sortBy = 'name'">Sort by Name</button>
  <button t-click="sortBy = 'price'">Sort by Price</button>

  <ul>
    <li t-for="item in sortedItems">
      <span t-text="item.name"></span> - $<span t-text="item.price"></span>
    </li>
  </ul>
</div>
```

<div t-data="{
  items: [
    { name: 'Banana', price: 2.5 },
    { name: 'Apple', price: 1.2 },
    { name: 'Cherry', price: 3.8 },
    { name: 'Date', price: 2.0 }
  ],
  sortBy: 'name',
  get sortedItems() {
    return [...this.items].sort((a, b) => {
      return a[this.sortBy] > b[this.sortBy] ? 1 : -1
    })
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div class="flex gap-2">
    <button t-click="sortBy = 'name'" class="px-4 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
      Sort by Name
    </button>
    <button t-click="sortBy = 'price'" class="px-4 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
      Sort by Price
    </button>
  </div>

  <ul class="space-y-2">
    <li t-for="item in sortedItems" class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
      <span t-text="item.name" class="text-gray-900 dark:text-white"></span>
      <span class="text-pine-600 dark:text-pine-400 font-medium">$<span t-text="item.price.toFixed(2)"></span></span>
    </li>
  </ul>
</div>

## Nested Loops

```html
<div t-data="{
  categories: [
    { name: 'Fruits', items: ['Apple', 'Banana'] },
    { name: 'Vegetables', items: ['Carrot', 'Broccoli'] }
  ]
}">
  <div t-for="category in categories">
    <h3 t-text="category.name"></h3>
    <ul>
      <li t-for="item in category.items" t-text="item"></li>
    </ul>
  </div>
</div>
```

<div t-data="{
  allItems: [
    { category: 'Fruits', item: 'Apple' },
    { category: 'Fruits', item: 'Banana' },
    { category: 'Fruits', item: 'Orange' },
    { category: 'Vegetables', item: 'Carrot' },
    { category: 'Vegetables', item: 'Broccoli' },
    { category: 'Vegetables', item: 'Spinach' },
    { category: 'Grains', item: 'Rice' },
    { category: 'Grains', item: 'Wheat' },
    { category: 'Grains', item: 'Oats' }
  ],
  currentCategory: '',
  get shouldShowCategory() {
    return function(index) {
      if (index === 0) return true;
      return this.allItems[index].category !== this.allItems[index - 1].category;
    }
  }
}" class="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 my-6 space-y-4">
  <div t-for="(entry, index) in allItems">
    <h3 t-show="index === 0 || allItems[index].category !== allItems[index - 1].category" class="text-lg font-bold text-pine-600 dark:text-pine-400 mt-3 first:mt-0">
      <span t-text="allItems[index].category"></span>
    </h3>
    <div class="ml-4">
      <div class="p-2 bg-gray-50 dark:bg-gray-700 rounded text-gray-900 dark:text-white mt-1">
        <span t-text="allItems[index].item"></span>
      </div>
    </div>
  </div>
</div>

## Best Practices

### 1. Use Keys for Performance

When possible, use unique identifiers:

```javascript
{
  items: [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ]
}
```

### 2. Avoid Complex Logic in Templates

```html
<!-- Good: Use computed property -->
<li t-for="item in visibleItems" t-text="item"></li>

<!-- Avoid: Complex filtering in template -->
<li t-for="item in items.filter(x => x.visible && x.active)" t-text="item"></li>
```

### 3. Keep Iterations Flat

```javascript
// Good
get flattenedItems() {
  return this.categories.flatMap(cat => cat.items)
}
```

## Common Patterns

### Pagination

```javascript
{
  items: [...],
  page: 1,
  perPage: 10,

  get paginatedItems() {
    const start = (this.page - 1) * this.perPage
    return this.items.slice(start, start + this.perPage)
  }
}
```

### Table Rendering

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr t-for="user in users">
      <td t-text="user.name"></td>
      <td t-text="user.email"></td>
      <td t-text="user.role"></td>
    </tr>
  </tbody>
</table>
```

## See Also

- [t-if](#/docs/directives/t-if) - Conditional rendering
- [t-show](#/docs/directives/t-show) - Toggle visibility
- [t-data](#/docs/directives/t-data) - Component state
