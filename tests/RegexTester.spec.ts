import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RegexTesterView from '@/views/RegexTesterView.vue'

describe('RegexTesterView', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(RegexTesterView, {
      global: {
        stubs: {
          RouterLink: true
        }
      }
    })
  })

  it('tests a regex and highlights match', async () => {
    await wrapper.find('input').setValue('\\d+')
    await wrapper.findAll('input')[1].setValue('g')
    await wrapper.find('textarea').setValue('The price is 123 dollars.')
    await wrapper.find('button.btn-green').trigger('click')

    expect(wrapper.html()).toContain('<mark')
    expect(wrapper.text()).toContain('✅ Regex executed!')
  })

  it('explains the regex correctly', async () => {
    await wrapper.find('input').setValue('\\d{2,}')
    await wrapper.find('button.btn-purple').trigger('click')

    expect(wrapper.text()).toContain('Regex: /\\d{2,}/')
    expect(wrapper.text()).toContain('↳ \\d → Any digit')
    expect(wrapper.text()).toContain('↳ {n} / {n,m} → Quantifiers')
  })

  it('handles invalid regex input', async () => {
    await wrapper.find('input').setValue('[a-')
    await wrapper.find('button.btn-green').trigger('click')

    expect(wrapper.text()).toContain('❌ Invalid regex pattern.')
  })

  it('copies explanation to clipboard', async () => {
    const clipboardSpy = vi.fn()
    Object.assign(navigator, {
      clipboard: { writeText: clipboardSpy }
    })

    await wrapper.find('input').setValue('\\d+')
    await wrapper.find('button.btn-purple').trigger('click')
    await wrapper.find('button.btn-gray').trigger('click')

    expect(clipboardSpy).toHaveBeenCalled()
  })
})
