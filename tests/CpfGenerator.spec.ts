import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CpfGenerator from '@/views/CpfGeneratorView.vue'

describe('CpfGenerator', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(CpfGenerator)
  })

  it('renders title and button', () => {
    expect(wrapper.text()).toContain('CPF Generator')
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('generates a valid CPF', async () => {
    await wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
  
    const pre = wrapper.find('pre')
    expect(pre.exists()).toBe(true)
    expect(pre.text()).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
  })  

  it('shows feedback after generating', async () => {
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('CPF generated!')
  })
})
