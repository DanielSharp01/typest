import { CombinedMiddleware, Middleware, MiddlewareWithInput } from './middleware';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RouteDefinition<T extends Middleware<any ,any>> = { method: HttpMethod, route: string, middleware: T };

export type ClientRouteDefinition<T> = { method: HttpMethod, route: string, type: T };

export function ClientRoute<T extends Middleware<any ,any>>(routeDefinition: RouteDefinition<T>): ClientRouteDefinition<Awaited<ReturnType<T>>> {
  return { method: routeDefinition.method, route: routeDefinition.route, type: undefined as any }
}

export function Router() {
  return {
    get<Route extends string, A, B, C, D, E, F, G, H, I, J>(
      route: Route,
      m1: MiddlewareWithInput<never, A>,
      m2?: MiddlewareWithInput<A, B>,
      m3?: MiddlewareWithInput<B, C>,
      m4?: MiddlewareWithInput<C, D>,
      m5?: MiddlewareWithInput<D, E>,
      m6?: MiddlewareWithInput<E, F>,
      m7?: MiddlewareWithInput<F, G>,
      m8?: MiddlewareWithInput<G, H>,
      m9?: MiddlewareWithInput<H, I>,
      m10?: MiddlewareWithInput<I, J>,
    ): RouteDefinition<CombinedMiddleware<A, B, C, D, E, F, G, H, I, J>> {
      return { method: 'GET', middleware: Middleware(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10), route }
    },
    post<Route extends string, A, B, C, D, E, F, G, H, I, J>(
      route: Route,
      m1: MiddlewareWithInput<never, A>,
      m2?: MiddlewareWithInput<A, B>,
      m3?: MiddlewareWithInput<B, C>,
      m4?: MiddlewareWithInput<C, D>,
      m5?: MiddlewareWithInput<D, E>,
      m6?: MiddlewareWithInput<E, F>,
      m7?: MiddlewareWithInput<F, G>,
      m8?: MiddlewareWithInput<G, H>,
      m9?: MiddlewareWithInput<H, I>,
      m10?: MiddlewareWithInput<I, J>,
    ): RouteDefinition<CombinedMiddleware<A, B, C, D, E, F, G, H, I, J>> {
      return { method: 'POST', middleware: Middleware(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10), route }
    },
    put<Route extends string, A, B, C, D, E, F, G, H, I, J>(
      route: Route,
      m1: MiddlewareWithInput<never, A>,
      m2?: MiddlewareWithInput<A, B>,
      m3?: MiddlewareWithInput<B, C>,
      m4?: MiddlewareWithInput<C, D>,
      m5?: MiddlewareWithInput<D, E>,
      m6?: MiddlewareWithInput<E, F>,
      m7?: MiddlewareWithInput<F, G>,
      m8?: MiddlewareWithInput<G, H>,
      m9?: MiddlewareWithInput<H, I>,
      m10?: MiddlewareWithInput<I, J>,
    ): RouteDefinition<CombinedMiddleware<A, B, C, D, E, F, G, H, I, J>> {
      return { method: 'PUT', middleware: Middleware(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10), route }
    },
    patch<Route extends string, A, B, C, D, E, F, G, H, I, J>(
      route: Route,
      m1: MiddlewareWithInput<never, A>,
      m2?: MiddlewareWithInput<A, B>,
      m3?: MiddlewareWithInput<B, C>,
      m4?: MiddlewareWithInput<C, D>,
      m5?: MiddlewareWithInput<D, E>,
      m6?: MiddlewareWithInput<E, F>,
      m7?: MiddlewareWithInput<F, G>,
      m8?: MiddlewareWithInput<G, H>,
      m9?: MiddlewareWithInput<H, I>,
      m10?: MiddlewareWithInput<I, J>,
    ): RouteDefinition<CombinedMiddleware<A, B, C, D, E, F, G, H, I, J>> {
      return { method: 'PATCH', middleware: Middleware(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10), route }
    },
    delete<Route extends string, A, B, C, D, E, F, G, H, I, J>(
      route: Route,
      m1: MiddlewareWithInput<never, A>,
      m2?: MiddlewareWithInput<A, B>,
      m3?: MiddlewareWithInput<B, C>,
      m4?: MiddlewareWithInput<C, D>,
      m5?: MiddlewareWithInput<D, E>,
      m6?: MiddlewareWithInput<E, F>,
      m7?: MiddlewareWithInput<F, G>,
      m8?: MiddlewareWithInput<G, H>,
      m9?: MiddlewareWithInput<H, I>,
      m10?: MiddlewareWithInput<I, J>,
    ): RouteDefinition<CombinedMiddleware<A, B, C, D, E, F, G, H, I, J>> {
      return { method: 'DELETE', middleware: Middleware(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10), route }
    }
  }
}