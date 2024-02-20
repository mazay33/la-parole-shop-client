export default defineEventHandler(async (event) => {

  const refreshToken = getCookie(event, "refreshToken")

  console.log(refreshToken);


  const repo = await $fetch('http://localhost:5000/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
    body:{
      refreshToken
    }

  })


  setCookie(event, 'refreshToken', repo.refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 30,

  })

  setCookie(event, 'accessToken', repo.accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
  })

  return repo
})
