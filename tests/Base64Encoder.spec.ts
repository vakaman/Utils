import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import Base64Encoder from '@/views/Base64EncoderView.vue'

describe('Base64Encoder', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(Base64Encoder, {
      global: {
        stubs: {
          RouterLink: true,
        },
      },
    })
  })

  it('renders title and textarea', () => {
    expect(wrapper.text()).toContain('Base64 Encoder / Decoder')
    expect(wrapper.find('textarea').exists()).toBe(true)
  })

  it('encodes input to base64', async () => {
    const textarea = wrapper.find('textarea')
    await textarea.setValue('hello')
    await wrapper.find('button.btn-green').trigger('click')

    expect(wrapper.text()).toContain('aGVsbG8=') // base64 de "hello"
    expect(wrapper.text()).toContain('Encoded successfully!')
  })

  it('decodes base64 input', async () => {
    const textarea = wrapper.find('textarea')
    await textarea.setValue('dGVzdGluZw==') // base64 de "testing"
    await wrapper.find('button.btn-blue').trigger('click')

    expect(wrapper.text()).toContain('testing')
    expect(wrapper.text()).toContain('Decoded successfully!')
  })

  it('shows error on invalid base64 input', async () => {
    const textarea = wrapper.find('textarea')
    await textarea.setValue('@@@')
    await wrapper.find('button.btn-blue').trigger('click')

    expect(wrapper.text()).toContain('Invalid Base64!')
    expect(wrapper.find('pre').exists()).toBe(false)
  })

  it('copies output to clipboard', async () => {
    const mockClipboard = vi.fn(() => Promise.resolve())
    Object.assign(navigator, {
      clipboard: { writeText: mockClipboard }
    })

    await wrapper.find('textarea').setValue('copyme')
    await wrapper.find('button.btn-green').trigger('click')
    await wrapper.find('button.btn-gray').trigger('click')

    await flushPromises()

    expect(mockClipboard).toHaveBeenCalledWith('Y29weW1l') // base64 de "copyme"
    expect(wrapper.text()).toContain('Copied!')
  })

  it('shows warning if copy is clicked with no output', async () => {
    await wrapper.find('textarea').setValue('')
    await wrapper.find('button.btn-gray').trigger('click')

    expect(wrapper.text()).toContain('Nothing to copy.')
  })
})
