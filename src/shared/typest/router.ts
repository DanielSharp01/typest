import type { ImplementedRouteDefinition } from '../../server/typest/implement';
import type { Middleware } from '../../server/typest/middleware';
import { Primitive } from './input';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface Route {
  method: HttpMethod;
  route: string;
  transformation?: Transformation,
}

export type ClientRoute<T> = { method: HttpMethod, route: string, transformation?: Transformation, type: T };

export type ClientRoutes<T extends Record<string, ImplementedRouteDefinition<any>>> =
{
  [Prop in keyof T]: ClientRoute<Awaited<ReturnType<T[Prop]['middleware']>>>
};

export type Transformation = {
  toTransmission: (value: Primitive) => Primitive,
  fromTransmission: (value: Primitive) => Primitive,
}

export function Router() {
  let internalTransformation: Transformation | undefined = undefined;
  return {
    useTransformation(transformation: Transformation | undefined) {
      internalTransformation = transformation;
    },
    get(route: string): Route {
      return { method: 'GET', route, transformation: internalTransformation };
    },
    post(route: string): Route {
      return { method: 'POST', route, transformation: internalTransformation };
    },
    put(route: string): Route {
      return { method: 'PUT', route, transformation: internalTransformation };
    },
    patch(route: string): Route {
      return { method: 'PATCH', route, transformation: internalTransformation };
    },
    delete(route: string): Route {
      return { method: 'DELETE', route, transformation: internalTransformation };
    }
  }
}

export function ClientRoutes<T extends Record<string, ImplementedRouteDefinition<any>>>(routes: Record<string, Route>): ClientRoutes<T> {
  return Object.keys(routes).reduce((acc, key) => {
    acc[key] = { method: routes[key].method, route: routes[key].route, transformation: routes[key].transformation };
    return acc;
  }, { } as any) as ClientRoutes<T>;
}