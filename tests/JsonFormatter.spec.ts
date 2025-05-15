import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import JsonFormatter from '@/views/JsonFormatterView.vue'

describe('JsonFormatter', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(JsonFormatter, {
      global: {
        stubs: {
          RouterLink: true
        }
      }
    })
  })

  it('renders the title', () => {
    expect(wrapper.text()).toContain('JSON Formatter')
  })

  it('formats valid JSON input', async () => {
    const input = wrapper.find('textarea')
    await input.setValue('{"foo":"bar"}')

    await wrapper.find('button.btn-green').trigger('click')

    expect(wrapper.text()).toContain('"foo": "bar"')
    expect(wrapper.text()).not.toContain('Invalid JSON!')
  })

  it('shows error message on invalid JSON', async () => {
    const input = wrapper.find('textarea')
    await input.setValue('{foo:bar}')

    await wrapper.find('button.btn-green').trigger('click')

    expect(wrapper.text()).toContain('Invalid JSON!')
    expect(wrapper.find('pre.json-output').exists()).toBe(false)
  })

  it('copies formatted JSON to clipboard', async () => {
    const clipboardMock = vi.fn()
    Object.assign(navigator, {
      clipboard: { writeText: clipboardMock }
    })

    const input = wrapper.find('textarea')
    await input.setValue('{"hello":"world"}')
    await wrapper.find('button.btn-green').trigger('click')
    await wrapper.find('button.btn-blue').trigger('click')

    expect(clipboardMock).toHaveBeenCalledWith('{\n  "hello": "world"\n}')
  })
})
