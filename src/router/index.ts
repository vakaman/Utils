import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import JsonFormatterView from '@/views/JsonFormatterView.vue';
import Base64EncoderView from '@/views/Base64EncoderView.vue';
import SlugGeneratorView from '@/views/SlugGeneratorView.vue';
import CpfGeneratorView from '@/views/CpfGeneratorView.vue';
import PrivacyPolicyView from '@views/PrivacyPolicyView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/json-formatter', name: 'JsonFormatter', component: JsonFormatterView },
  { path: '/base64-encoder', name: 'Base64Encoder', component: Base64EncoderView },
  { path: '/slug-generator', name: 'SlugGenerator', component: SlugGeneratorView },
  { path: '/cpf-generator', name: 'CpfGeneratorView', component: CpfGeneratorView },
  { path: '/privacy', name: 'PrivacyPolicy', component: PrivacyPolicyView }, 
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
