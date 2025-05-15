import toolRoutes from '@/router/toolRoutes'

export default toolRoutes.map(route => ({
  name: route.name as string,
  path: route.path,
  description: route.meta?.description || ''
}))
