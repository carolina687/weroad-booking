import { describe, expect, it } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

describe('pages', async () => {
  await setup({
    server: true
  })

  it('Renders the travels page', async () => {
    expect(await $fetch('/')).toMatch('Create a travel')
  })

  it('Renders the Booking page', async () => {
    expect(await $fetch('/booking')).toMatch('Book a new travel')
  })
})