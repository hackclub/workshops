export const removeFromLast = (path, key) => {
  const i = path.lastIndexOf(key)
  return i === -1 ? path : path.substring(0, i)
}

export const findRouteByPath = (path, routes) => {
  for (const route of routes) {
    if (route.path && removeFromLast(route.path, '.') === path) {
      return route
    }
    const childPath = route.routes && findRouteByPath(path, route.routes)
    if (childPath) return childPath
  }
}

export const getPaths = (nextRoutes, carry = []) => {
  nextRoutes.forEach(({ path, routes }) => {
    if (path) {
      carry.push(removeFromLast(path, '.'))
    } else if (routes) {
      getPaths(routes, carry)
    }
  })

  return carry
}
