import { defineConfig } from 'vitest/config'

// Node-environment unit tests only. Route handlers and components are not covered
// here; the ledger library is, because the framework's TA tooling reads its output.
export default defineConfig({
  // The app's PostCSS config is Next-specific and Vite cannot load it; these tests
  // touch no CSS, so opt out of PostCSS entirely.
  css: { postcss: { plugins: [] } },
  test: {
    environment: 'node',
    include: ['app/**/*.test.ts'],
    exclude: ['node_modules/**', '.next/**'],
  },
})
