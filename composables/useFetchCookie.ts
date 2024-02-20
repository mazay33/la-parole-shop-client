import { appendResponseHeader, H3Event } from 'h3'

export const fetchWithCookie = async (event: H3Event, url: string) => {
  /* Get the response from the server endpoint */

  console.log(url)
  // console.log(event.headers);

  const res = await $fetch
    .raw(url, {
      credentials: 'include',
      headers: useRequestHeaders(['cookie']),
    })


  console.log('REEES ->>>>', res)

  /* Get the cookies from the response */
  const cookies = (res.headers.get('set-cookie') || '').split(',')

  /* Attach each cookie to our incoming Request */
  for (const cookie of cookies) {
    appendResponseHeader(event, 'set-cookie', cookie)
  }
  /* Return the data of the response */
  return res._data
}
