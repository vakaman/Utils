import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import JwtDecoderView from '@/views/JwtDecoderView.vue'

// JWT de exemplo (header: {"alg":"HS256"}, payload: {"sub":"1234567890","name":"John Doe","admin":true})
const validJwt =
    'eyJhbGciOiJIUzI1NiJ9.' +
    'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.' +
    'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

describe('JwtDecoderView', () => {
    let wrapper: ReturnType<typeof mount>

    beforeEach(() => {
        wrapper = mount(JwtDecoderView, {
            global: {
                stubs: {
                    RouterLink: true
                }
            }
        })
    })

    it('decodes a valid JWT', async () => {
        const textarea = wrapper.find('textarea')
        await textarea.setValue(validJwt)
        await wrapper.find('button.btn-green').trigger('click')

        expect(wrapper.text()).toContain('"name": "John Doe"')
        expect(wrapper.text()).toContain('"alg": "HS256"')
        expect(wrapper.text()).toContain('✅ JWT decoded!')
    })

    it('shows error for invalid JWT format', async () => {
        await wrapper.find('textarea').setValue('invalid.jwt')
        await wrapper.find('button.btn-green').trigger('click')

        expect(wrapper.text()).toContain('❌ Failed to decode JWT.')
    })

    it('clears the input and output', async () => {
        await wrapper.find('textarea').setValue(validJwt)
        await wrapper.find('button.btn-green').trigger('click')
        await wrapper.find('button.btn-gray').trigger('click')

        const textarea = wrapper.find('textarea')
        expect((textarea.element as HTMLTextAreaElement).value).toBe('')
        expect(wrapper.text()).not.toContain('"name": "John Doe"')
    })

    it('copies decoded data to clipboard', async () => {
        const mockClipboard = vi.fn()
        Object.assign(navigator, {
            clipboard: { writeText: mockClipboard }
        })

        await wrapper.find('textarea').setValue(validJwt)
        await wrapper.find('button.btn-green').trigger('click')
        await wrapper.find('button.btn-blue').trigger('click')

        expect(mockClipboard).toHaveBeenCalled()
        expect(wrapper.text()).toContain('✅ Copied!')
    })

    it('warns when trying to copy with no decoded data', async () => {
        const mockClipboard = vi.fn()
        Object.assign(navigator, {
            clipboard: { writeText: mockClipboard }
        })

        await wrapper.find('textarea').setValue('')
        await wrapper.find('button.btn-blue').trigger('click')

        expect(wrapper.text()).toContain('⚠️ Nothing to copy.')
        expect(mockClipboard).not.toHaveBeenCalled()
    })

    it('shows error when JWT has less than 2 parts', async () => {
        await wrapper.find('textarea').setValue('invalid-token')
        await wrapper.find('button.btn-green').trigger('click')

        expect(wrapper.text()).toContain('❌ Invalid JWT format.')
    })

})
