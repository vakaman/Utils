import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SlugGenerator from '@/views/SlugGeneratorView.vue'

describe('SlugGenerator', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(SlugGenerator, {
      global: {
        stubs: {
          RouterLink: true
        }
      }
    })
  })

  it('generates slug from input text', async () => {
    await wrapper.find('textarea').setValue('Hello World! Test 123')
    await wrapper.find('button.btn-green').trigger('click')
    expect(wrapper.text()).toContain('hello-world-test-123')
  })

  it('copies the slug to clipboard', async () => {
    const mockClipboard = vi.fn()
    Object.assign(navigator, {
      clipboard: { writeText: mockClipboard }
    })

    await wrapper.find('textarea').setValue('Slug Test!')
    await wrapper.find('button.btn-green').trigger('click')
    await wrapper.find('button.btn-blue').trigger('click')

    expect(mockClipboard).toHaveBeenCalledWith('slug-test')
    expect(wrapper.text()).toContain('Copied!')
  })
})
