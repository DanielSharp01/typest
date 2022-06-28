import type { Input } from '../../shared/typest/input';
import type { ClientRoute } from '../../shared/typest/router';

type ClientInput = Partial<Omit<Input, 'cookies'>>;

type Endpoint<P extends any[], T> = (...params: P) => ClientInput & { route: ClientRoute<T> };

type Endpoints = Record<string, Endpoint<any, any>>;

type EndpointFunctions<T extends Endpoints> = {
  [Prop in keyof T]: (...params: Parameters<T[Prop]>) => Promise<ReturnType<T[Prop]>['route']['type']>
}


function mergeInputs(a: ClientInput, b: ClientInput & { route: ClientRoute<any> }): ClientInput & { route: ClientRoute<any> } {
  return {
    params: { ...a.params, ...b.params },
    headers: { ...a.headers, ...b.headers },
    body: b.body ?? a.body,
    query: { ...a.query, ...b.query },
    route: b.route
  }
}

export function fetchClient<T extends Endpoints, S>(endpoints: T, stateMapper?: (state: S) => ClientInput): { endpoints: EndpointFunctions<T>, setClientState: (state: S) => void } {
  const fetchEndpoints: any = { };
  let stateInputs: ClientInput = { };
  const client = { endpoints: fetchEndpoints, setClientState: (state: S) => {
    if (!stateMapper) return;
    stateInputs = stateMapper(state);
  }}
  for (const key in endpoints) {
    fetchEndpoints[key] = (...params: any[]) => {
      const inputs = mergeInputs(stateInputs, endpoints[key](...params));
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

      const fromTransmission = inputs.route.fromTransmission ?? ((x: any) => x);
      return fetch(url,
      {
        method: inputs.route.method,
        body: inputs.body ? JSON.stringify(inputs.body) : undefined,
        headers: { ...inputs.headers, 'Content-Type': 'application/json' }
      }).catch(() => { throw { error: 'Network error' }; }).then(async res => {
        if (!res.ok) {
          throw fromTransmission(await res.json());
        }
        
        return fromTransmission(await res.json());
      });
    }
  }
  return client;
}