import { Input, Primitive } from './input';

export type MiddlewareWithInput<Previous, Output> = (input: Input, previous: Previous) => Output | Promise<Output>;

export type Middleware<I, O> = (input: I) => O | Promise<O>;

export type CombinedMiddleware<A, B, C, D, E, F, G, H, I, J> = 
  J extends Primitive
  ? Middleware<Input, J>
  : I extends Primitive
  ? Middleware<Input, I>
  : H extends Primitive
  ? Middleware<Input, H>
  : G extends Primitive
  ? Middleware<Input, G>
  : F extends Primitive
  ? Middleware<Input, F>
  : E extends Primitive
  ? Middleware<Input, E>  
  : D extends Primitive
  ? Middleware<Input, D>  
  : C extends Primitive
  ? Middleware<Input, C>
  : B extends Primitive
  ? Middleware<Input, B>
  : Middleware<Input, A>;


export function Middleware<A, B, C, D, E, F, G, H, I, J>(
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
): CombinedMiddleware<A, B, C, D, E, F, G, H, I, J> {
  return (async (input: Input) => {
    const middlewares = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10].filter(x => !!x) as any[];
    let previous;
    for (const mw of middlewares) {
      previous = await mw(input, previous);
    }
    return previous;
  }) as any;
}