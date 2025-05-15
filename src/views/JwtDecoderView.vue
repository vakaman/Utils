<template>
    <BaseLayout>
        <h1 class="text-2xl font-bold mb-2">JWT Decoder</h1>
        <p class="mb-4 text-sm text-gray-700"> A <strong>JWT (JSON Web Token)</strong> is a compact and self-contained
            way to transmit information between two parties securely as a JSON object. </p>
        <p class="mb-4 text-sm text-gray-700"> It consists of three parts separated by dots:
            <code>header.payload.signature</code>. The <strong>header</strong> contains metadata, the
            <strong>payload</strong> carries the claims (data), and the <strong>signature</strong> ensures the token was
            not tampered with. </p>
        <p class="mb-4 text-sm text-gray-700"> The <strong>signature</strong> is generated using a secret key (HMAC) or
            a public/private key pair (RSA or ECDSA). This signature allows the receiver to verify the authenticity of
            the token. </p>
        <p class="mb-6 text-sm text-red-700 font-semibold"> ⚠️ This tool only decodes the header and payload. It does
            <u>not</u> verify the token's signature. </p>
        <p class="mb-4 text-sm text-gray-700"> Paste a JWT token (in format <code>header.payload.signature</code>) to
            decode its header and payload. <strong>This tool does not verify the signature.</strong>
        </p>
        <Feedback :message="feedback" :color="feedbackColor" />
        <textarea v-model="jwt" placeholder="Paste your JWT here..." class="w-full p-3 border rounded mb-4"
            rows="4"></textarea>
        <div class="flex flex-wrap gap-2 mb-4">
            <button @click="decodeJWT" class="btn-green">Decode</button>
            <button @click="copyOutput" class="btn-blue">Copy</button>
            <button @click="clear" class="btn-gray">Clear</button>
        </div>
        <div v-if="header || payload" class="bg-gray-100 p-3 rounded text-sm space-y-2">
            <div v-if="header">
                <strong>Header:</strong>
                <pre class="whitespace-pre-wrap break-words">{{ header }}</pre>
            </div>
            <div v-if="payload">
                <strong>Payload:</strong>
                <pre class="whitespace-pre-wrap break-words">{{ payload }}</pre>
            </div>
        </div>
    </BaseLayout>
</template>
<script setup>
import { ref } from 'vue'
import BaseLayout from '@/components/BaseLayout.vue'
import Feedback from '@/components/Feedback.vue'

const jwt = ref('')
const header = ref('')
const payload = ref('')
const feedback = ref('')
const feedbackColor = ref('blue')

function showFeedback(message, color = 'blue', duration = 2000) {
    feedback.value = message
    feedbackColor.value = color
    setTimeout(() => {
        feedback.value = ''
    }, duration)
}

function decodeBase64(str) {
    try {
        return decodeURIComponent(atob(str).split('').map(c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''))
    } catch {
        return ''
    }
}

function decodeJWT() {
    const parts = jwt.value.split('.')
    if (parts.length < 2) {
        header.value = ''
        payload.value = ''
        showFeedback('❌ Invalid JWT format.', 'red')
        return
    }

    try {
        header.value = JSON.stringify(JSON.parse(decodeBase64(parts[0])), null, 2)
        payload.value = JSON.stringify(JSON.parse(decodeBase64(parts[1])), null, 2)
        showFeedback('✅ JWT decoded!', 'green')
    } catch (e) {
        header.value = ''
        payload.value = ''
        showFeedback('❌ Failed to decode JWT.', 'red')
    }
}

async function copyOutput() {
    if (!payload.value && !header.value) {
        showFeedback('⚠️ Nothing to copy.', 'yellow')
        return
    }

    const combined = `Header:\n${header.value}\n\nPayload:\n${payload.value}`

    try {
        await navigator.clipboard.writeText(combined)
        showFeedback('✅ Copied!', 'blue')
    } catch {
        showFeedback('❌ Failed to copy!', 'red')
    }
}

function clear() {
    jwt.value = ''
    header.value = ''
    payload.value = ''
    showFeedback('🧹 Cleared.', 'blue')
}
</script>
