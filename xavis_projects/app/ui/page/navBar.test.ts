import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

// The nav is a client component, which the node-environment tests cannot render,
// so this reads its source. Both menus (desktop list and mobile panel) live in it.
const navBarSource = readFileSync(
  fileURLToPath(new URL('./NavBar.tsx', import.meta.url)),
  'utf8',
)

describe('site navigation', () => {
  it('does not link to the pages hidden from the menu (BL-13)', () => {
    expect(navBarSource).not.toContain('/resourcesAndBlog')
    expect(navBarSource).not.toContain('/support')
  })

  it('still links to About, Projects and the company site', () => {
    expect(navBarSource).toContain("href: '/about'")
    expect(navBarSource).toContain("href: '/projects'")
    expect(navBarSource).toContain('https://xavi-codeco.com')
  })
})
