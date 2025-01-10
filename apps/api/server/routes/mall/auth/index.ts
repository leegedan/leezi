
export default eventHandler((event) => {
    // const id = getRouterParam(event, 'id')
    const code = getRouterParam(event, 'id')
    const url = getRouterParam(event, 'id')

    if (code) {
      return sendRedirect(event, url, 302)
    } else {
      return sendRedirect(event, '/', 301)
    }
  })
  