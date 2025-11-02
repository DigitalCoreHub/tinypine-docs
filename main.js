import './style.css'

// Configure marked with syntax highlighting
marked.setOptions({
  highlight: function(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value
      } catch (err) {
        console.error('Highlight error:', err)
      }
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
  gfm: true,
})

// Global helper functions for TinyPine 1.3.0 compatibility
window.toggleTheme = function() {
  const appEl = document.getElementById('app')
  const state = appEl?._tinypineState
  if (state) {
    state.isDark = !state.isDark
    if (state.isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', state.isDark ? 'dark' : 'light')
  }
}

window.toggleSidebar = function() {
  const appEl = document.getElementById('app')
  const state = appEl?._tinypineState
  if (state) {
    state.sidebarOpen = !state.sidebarOpen
  }
}

// Main app state
window.app = function() {
  return {
    // State
    currentRoute: '',
    searchQuery: '',
    loading: false,
    sidebarOpen: window.innerWidth >= 1024, // Open by default on desktop
    isDark: false,

    // Initialization
    init() {
      this.initTheme()
      this.initRouter()
      this.updateActiveLinks()

      // Handle responsive sidebar
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
          this.sidebarOpen = true
        }
      })
    },

    // Theme Management
    initTheme() {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      this.isDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
      this.applyTheme()
    },

    toggleTheme() {
      this.isDark = !this.isDark
      this.applyTheme()
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },

    applyTheme() {
      if (this.isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },

    // Sidebar Toggle
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },

    // Router
    initRouter() {
      // Load initial route
      this.handleRouteChange()

      // Listen for hash changes
      window.addEventListener('hashchange', () => {
        this.handleRouteChange()
      })
    },

    async handleRouteChange() {
      const hash = window.location.hash || '#/'
      this.currentRoute = hash

      // Close sidebar on mobile after navigation
      if (window.innerWidth < 1024) {
        this.sidebarOpen = false
      }

      // Update active links
      this.updateActiveLinks()

      // Route to content
      if (hash === '#/' || hash === '') {
        await this.loadMarkdown('introduction')
      } else if (hash.startsWith('#/docs/')) {
        const docPath = hash.replace('#/docs/', '')
        await this.loadMarkdown(docPath)
      } else {
        this.showNotFound()
      }
    },

    updateActiveLinks() {
      // Remove all active classes
      document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active')
      })

      // Add active class to current link
      const currentLink = document.querySelector(`a[href="${this.currentRoute}"]`)
      if (currentLink) {
        currentLink.classList.add('active')
      }
    },

    // Markdown Loading
    async loadMarkdown(path) {
      this.loading = true
      const contentDiv = document.getElementById('markdown-content')

      try {
        const response = await fetch(`./docs/${path}.md`)

        if (!response.ok) {
          throw new Error('Document not found')
        }

        const markdown = await response.text()
        const html = marked.parse(markdown)

        contentDiv.innerHTML = html

        // Highlight code blocks
        contentDiv.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightElement(block)
        })

        // Execute inline <script> tags inside rendered markdown (for demos that define helper functions)
        try {
          const scripts = Array.from(contentDiv.querySelectorAll('script'))
          window.__executedMdScripts = window.__executedMdScripts || new Set()
          for (const oldScript of scripts) {
            const s = document.createElement('script')
            // copy attributes
            for (const { name, value } of Array.from(oldScript.attributes)) {
              s.setAttribute(name, value)
            }
            s.textContent = oldScript.textContent || ''

            // Build a simple signature to avoid running the exact same inline script multiple times
            const sig = `${s.textContent}\n@@${Array.from(s.attributes).map(a => `${a.name}=${a.value}`).join(';')}`
            if (!window.__executedMdScripts.has(sig)) {
              document.body.appendChild(s) // execute in document context
              window.__executedMdScripts.add(sig)
            }
            oldScript.remove() // remove original to avoid duplicates
          }
        } catch (e) {
          console.warn('Markdown demo scripts execution failed:', e)
        }

        // Re-initialize TinyPine on newly injected markdown content so live examples work
        try {
          if (window.TinyPine) {
            // Prefer an element-scoped init if available
            if (typeof window.TinyPine.initTree === 'function') {
              window.TinyPine.initTree(contentDiv)
            } else if (typeof window.TinyPine.mount === 'function') {
              window.TinyPine.mount(contentDiv)
            } else if (typeof window.TinyPine.init === 'function') {
              // Fallback: re-init (may rescan globally in some versions)
              window.TinyPine.init()
            }
          }
        } catch (e) {
          console.error('TinyPine re-init failed for markdown content:', e)
        }

        // Scroll to top
        window.scrollTo(0, 0)

      } catch (error) {
        console.error('Error loading markdown:', error)
        this.showNotFound()
      } finally {
        this.loading = false
      }
    },

    showNotFound() {
      const contentDiv = document.getElementById('markdown-content')
      contentDiv.innerHTML = `
        <div class="text-center py-12">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
          <a href="#/" class="inline-flex items-center px-4 py-2 bg-pine-600 text-white rounded-lg hover:bg-pine-700 transition-colors">
            Go to Home
          </a>
        </div>
      `
      this.loading = false
    },
  }
}

// Initialize TinyPine after DOM is ready and window.app is defined
document.addEventListener('DOMContentLoaded', () => {
  // Patch TinyPine router bug - define getCurrent before init
  if (typeof window.TinyPine !== 'undefined' && window.TinyPine.router) {
    if (!window.TinyPine.router.getCurrent) {
      window.TinyPine.router.getCurrent = function() {
        return window.location.hash.slice(1) || '/'
      }
    }
  }

  // Now that window.app is defined, initialize TinyPine
  if (window.TinyPine) {
    window.TinyPine.init();
  }

  // Wait a moment for TinyPine to process directives, then trigger app init
  setTimeout(() => {
    const appElement = document.getElementById('app')

    // Try to get the context/state from TinyPine
    const state = appElement?._tinypineState

    if (state && typeof state.init === 'function') {
      console.log('Calling app.init()...')
      state.init()
    } else {
      console.error('No TinyPine state found or init is not a function', state)
    }
  }, 100)
})
