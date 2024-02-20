export default function (context) {
  if (process.server) {
    context.ssrContext.req.serverCookie = context.req.headers.cookie;
  }
}
