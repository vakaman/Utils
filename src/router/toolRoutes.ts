import JsonFormatterView from '@/views/JsonFormatterView.vue'
import Base64EncoderView from '@/views/Base64EncoderView.vue'
import SlugGeneratorView from '@/views/SlugGeneratorView.vue'
import CpfGeneratorView from '@/views/CpfGeneratorView.vue'
import UuidGeneratorView from '@/views/UuidGeneratorView.vue'
import JwtDecoderView from '@/views/JwtDecoderView.vue'
import TimeStampToolView from '@/views/TimeStampToolView.vue'
import RegexTesterView from '@/views/RegexTesterView.vue'
import CronToolViewVue from '@/views/CronToolView.vue'
import Base64imageConverterViewVue from '@/views/Base64imageConverterView.vue'
import DnsLookupViewVue from '@/views/DnsLookupView.vue'

const routes = [
    {
        path: '/json-formatter-and-schema-validator',
        name: 'Json Formatter',
        component: JsonFormatterView,
        meta: {
            isTool: true,
            description: 'Format your JSON and validate with schema.'
        }
    },
    {
        path: '/base64-encoder',
        name: 'Base64 Encoder',
        component: Base64EncoderView,
        meta: {
            isTool: true,
            description: 'Encode or decode Base64 strings easily.'
        }
    },
    {
        path: '/slug-generator',
        name: 'Slug Generator',
        component: SlugGeneratorView,
        meta: {
            isTool: true,
            description: 'Convert text into URL-friendly slugs.'
        }
    },
    {
        path: '/cpf-generator',
        name: 'Cpf Generator',
        component: CpfGeneratorView,
        meta: {
            isTool: true,
            description: 'Generate a dynamic CPF (Brazilian Person ID).'
        }
    },
    {
        path: '/uuid-generator',
        name: 'Uuid Generator',
        component: UuidGeneratorView,
        meta: {
            isTool: true,
            description: 'Generate a dynamic Uuid.'
        }
    },
    {
        path: '/jwt-decoder',
        name: 'Jwt Decoder',
        component: JwtDecoderView,
        meta: {
            isTool: true,
            description: 'A simple tool that decode your JWT.'
        }
    },
    {
        path: '/timestamp-tools',
        name: 'Timestamp Tools',
        component: TimeStampToolView,
        meta: {
            isTool: true,
            description: 'A simple tool to convert and recognize common timestamp and date formats.'
        }
    },
    {
        path: '/regex-tester-tool',
        name: 'Regex Tester',
        component: RegexTesterView,
        meta: {
            isTool: true,
            description: 'Test regular expressions and understand what each part of the pattern means.'
        }
    },
    {
        path: '/cron-tool',
        name: 'Cron Tool',
        component: CronToolViewVue,
        meta: {
            isTool: true,
            description: 'Generate and test cron expressions easily.'
        }
    },
    {
        path: '/base64-image-converter',
        name: 'Base64 Image Converter',
        component: Base64imageConverterViewVue,
        meta: {
            isTool: true,
            description: 'Convert images to Base64 and vice versa.'
        }
    },
    {
        path: '/dns-lookup-tool',
        name: 'DNS Lookup Tool',
        component: DnsLookupViewVue,
        meta: {
            isTool: true,
            description: 'Do a DNS lookup for a domain name and get its IP address.'
        }
    }
]

export default routes
