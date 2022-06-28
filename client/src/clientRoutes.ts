import type { ImplementedRouteDefinition, Transformation, HttpMethod, Route } from '@typest/server';

export type ClientRoute<T> = { method: HttpMethod, route: string, transformation?: Transformation, type: T };

export type ClientRoutes<T extends Record<string, ImplementedRouteDefinition<any>>> =
{
  [Prop in keyof T]: ClientRoute<Awaited<ReturnType<T[Prop]['middleware']>>>
};

export function ClientRoutes<T extends Record<string, ImplementedRouteDefinition<any>>>(routes: Record<string, Route>): ClientRoutes<T> {
  return Object.keys(routes).reduce((acc, key) => {
    acc[key] = { method: routes[key].method, route: routes[key].route, transformation: routes[key].transformation };
    return acc;
  }, { } as any) as ClientRoutes<T>;
}