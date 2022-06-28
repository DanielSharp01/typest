import type { Input } from './input';
import type { ClientRouteDefinition } from './router';

type Endpoint<P extends any[], T> = (...params: P) => Partial<Input> & { route: ClientRouteDefinition<T> };

type Endpoints = Record<string, Endpoint<any, any>>;

type EndpointFunctions<T extends Endpoints> = {
  [Prop in keyof T]: (...params: Parameters<T[Prop]>) => Promise<ReturnType<T[Prop]>['route']['type']>
}

export function fetchClient<T extends Endpoints>(endpoints: T): EndpointFunctions<T> {
  const fetches: any = { };
  for (const key in endpoints) {
    fetches[key] = (...params: any[]) => {
      const inputs = endpoints[key](...params);
      let url = `http://localhost:4000${inputs.route.route}`;
      
      for (const pkey in inputs.params) {
        url = url.replace(`:${pkey}`, inputs.params[pkey])
      }

      const queryParams = new URLSearchParams();
      for (const qkey in inputs.query) {
        if (Array.isArray(inputs.query[qkey])) {
          for (const val of inputs.query[qkey] as string[]) {
            queryParams.set(qkey, val)
          }
        }
        queryParams.set(qkey, inputs.query[qkey] as string);
      }
      const queryString = queryParams.toString()
      if (queryString.length > 0) {
        url += `?${queryString}`;
      }

      return fetch(url,
      {
        method: inputs.route.method,
        body: inputs.body ? JSON.stringify(inputs.body) : undefined,
        headers: inputs.headers,
      }).then(res => res.json());
    }
  }
  return fetches;
}