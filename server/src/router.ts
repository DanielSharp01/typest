import type { ImplementedRouteDefinition } from './implement';
import { Primitive } from './input';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface Route {
  method: HttpMethod;
  route: string;
  transformation?: Transformation,
}

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