import { CombinedMiddleware, Middleware, MiddlewareWithInput } from './middleware';
import { HttpMethod, Route, Transformation } from './router';

export type ImplementedRouteDefinition<T extends Middleware<any ,any>> = { method: HttpMethod, route: string, middleware: T, transformation?: Transformation };

export function implement<A, B, C, D, E, F, G, H, I, J>(route: Route, m1: MiddlewareWithInput<never, A>,
  m2?: MiddlewareWithInput<A, B>,
  m3?: MiddlewareWithInput<B, C>,
  m4?: MiddlewareWithInput<C, D>,
  m5?: MiddlewareWithInput<D, E>,
  m6?: MiddlewareWithInput<E, F>,
  m7?: MiddlewareWithInput<F, G>,
  m8?: MiddlewareWithInput<G, H>,
  m9?: MiddlewareWithInput<H, I>,
  m10?: MiddlewareWithInput<I, J>
): ImplementedRouteDefinition<CombinedMiddleware<A, B, C, D, E, F, G, H, I, J>> {
  return { ...route, middleware: Middleware(m1, m2, m3, m4, m5, m6, m7, m8, m9, m10) };
}

export function Ok<T>(res: T): T {
  return { ...res, __statusCode: 200 } as T;
}

export function Created<T>(res: T): T {
  return { ...res, __statusCode: 201 } as T;
}

export function NoContent<T>(res: T): T {
  return { ...res, __statusCode: 204 } as T;
}

export function BadRequest<T>(res: T): T {
  return { ...res, __statusCode: 400 } as T;
}

export function Unauthorized<T>(res: T): T {
  return { ...res, __statusCode: 401 } as T;
}

export function Forbidden<T>(res: T): T {
  return { ...res, __statusCode: 403 } as T;
}

export function NotFound<T>(res: T): T {
  return { ...res, __statusCode: 404 } as T;
}

export function Conflict<T>(res: T): T {
  return { ...res, __statusCode: 409 } as T;
}

export function InternalError<T>(res: T): T {
  return { ...res, __statusCode: 500 } as T;
}