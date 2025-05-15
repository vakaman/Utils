import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UuidGeneratorView from '@/views/UuidGeneratorView.vue'

describe('UuidGeneratorView', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(UuidGeneratorView, {
      global: {
        stubs: {
          RouterLink: true
        }
      }
    })
  })

  it('generates UUID v1', async () => {
    await wrapper.find('button.btn-blue').trigger('click')
    const uuid = wrapper.text().match(/[0-9a-fA-F\-]{36}/)?.[0]
    expect(uuid).toBeTruthy()
    expect(uuid?.length).toBe(36)
  })

  it('generates UUID v4', async () => {
    await wrapper.find('button.btn-green').trigger('click')
    const uuid = wrapper.text().match(/[0-9a-fA-F\-]{36}/)?.[0]
    expect(uuid).toBeTruthy()
    expect(uuid?.length).toBe(36)
  })

  it('does not generate UUID v5 without input', async () => {
    await wrapper.find('button.btn-purple').trigger('click')
    expect(wrapper.text()).toContain('Please enter a name for UUID v5')
  })

  it('generates UUID v5 with input', async () => {
    const input = wrapper.find('input[type="text"]')
    await input.setValue('example.com')
    await wrapper.find('button.btn-purple').trigger('click')

    const uuid = wrapper.text().match(/[0-9a-fA-F\-]{36}/)?.[0]
    expect(uuid).toBeTruthy()
    expect(uuid?.length).toBe(36)
  })

  it('copies the UUID to clipboard', async () => {
    const mockClipboard = vi.fn()
    Object.assign(navigator, {
      clipboard: { writeText: mockClipboard }
    })

    await wrapper.find('button.btn-green').trigger('click')
    await wrapper.find('button.btn-yellow').trigger('click')

    expect(mockClipboard).toHaveBeenCalled()
    expect(wrapper.text()).toContain('Copied')
  })

  it('clears the UUID and input', async () => {
    await wrapper.find('input[type="text"]').setValue('test.com')
    await wrapper.find('button.btn-purple').trigger('click')
    await wrapper.find('button.btn-gray').trigger('click')

    const uuidDisplay = wrapper.find('pre')
    const input = wrapper.find('input[type="text"]')
    expect(uuidDisplay.exists()).toBe(false)
    expect((input.element as HTMLInputElement).value).toBe('')
  })
})
