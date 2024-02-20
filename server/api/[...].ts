import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const proxyUrl = useRuntimeConfig().public.myProxyUrl

  const path = event.path
  console.log(path);


  const target = joinURL(proxyUrl, path)

  return proxyRequest(event, target)
})
