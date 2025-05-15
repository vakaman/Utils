import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TimeStampToolView from '@/views/TimeStampToolView.vue'

let wrapper: ReturnType<typeof mount>

beforeEach(() => {
  wrapper = mount(TimeStampToolView, {
    global: {
      stubs: {
        RouterLink: true
      }
    }
  })
})

describe('TimestampToolView', () => {
  it('detects Unix timestamp in seconds', async () => {
    await wrapper.find('textarea').setValue('1700000000')
    await wrapper.find('button.btn-green').trigger('click')
    expect(wrapper.text()).toContain('Unix Timestamp (seconds)')
  })

  it('detects Unix timestamp in milliseconds', async () => {
    await wrapper.find('textarea').setValue('1700000000123')
    await wrapper.find('button.btn-green').trigger('click')
    expect(wrapper.text()).toContain('Unix Timestamp (milliseconds)')
  })

  it('detects ISO 8601 format', async () => {
    await wrapper.find('textarea').setValue('2024-06-01T14:30:00Z')
    await wrapper.find('button.btn-green').trigger('click')
    expect(wrapper.text()).toContain('ISO 8601')
  })

  it('detects Date format (YYYY-MM-DD)', async () => {
    await wrapper.find('textarea').setValue('2025-01-30')
    await wrapper.find('button.btn-green').trigger('click')
    expect(wrapper.text()).toContain('Date (YYYY-MM-DD)')
  })

  it('detects Time format (HH:mm)', async () => {
    await wrapper.find('textarea').setValue('14:45')
    await wrapper.find('button.btn-green').trigger('click')
    expect(wrapper.text()).toContain('Time (HH:mm)')
  })

  it('handles unknown format', async () => {
    await wrapper.find('textarea').setValue('123abc')
    await wrapper.find('button.btn-green').trigger('click')
    expect(wrapper.text()).toContain('Unknown format')
  })

  it('converts valid timestamp to date', async () => {
    await wrapper.find('textarea').setValue('1700000000')
    await wrapper.find('button.btn-blue').trigger('click')
    expect(wrapper.text()).toContain('UTC:')
    expect(wrapper.text()).toContain('ISO:')
    expect(wrapper.text()).toContain('Local:')
  })

  it('converts valid date to timestamp', async () => {
    await wrapper.find('textarea').setValue('2024-12-25T18:00:00Z')
    await wrapper.find('button.btn-purple').trigger('click')
    expect(wrapper.text()).toContain('Unix (s):')
    expect(wrapper.text()).toContain('Unix (ms):')
  })

  it('shows error for invalid timestamp conversion', async () => {
    await wrapper.find('textarea').setValue('invalid')
    await wrapper.find('button.btn-blue').trigger('click')
    expect(wrapper.text()).toContain('Invalid timestamp')
  })

  it('shows error for invalid date conversion', async () => {
    await wrapper.find('textarea').setValue('not-a-date')
    await wrapper.find('button.btn-purple').trigger('click')
    expect(wrapper.text()).toContain('Invalid date input')
  })
})
