export function matchPath(
  routePath: string,
  actualPath: string,
): { matched: boolean; params: Record<string, string> } {
  const clean = (p: string) => p.split("?")[0];

  const routeSegments = clean(routePath).split("/").filter(Boolean);
  const pathSegments = clean(actualPath).split("/").filter(Boolean);

  if (routeSegments.length !== pathSegments.length) {
    return { matched: false, params: {} };
  }

  const params: Record<string, string> = {};
  for (let i = 0; i < routeSegments.length; i++) {
    const routePart = routeSegments[i];
    const pathPart = pathSegments[i];

    if (routePart.startsWith(":")) {
      params[routePart.slice(1)] = pathPart;
    } else if (routePart !== pathPart) {
      return { matched: false, params: {} };
    }
  }

  return { matched: true, params };
}
