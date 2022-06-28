import { expressify } from './expressify';
import { Middleware } from './middleware'
import { ClientRoute, Router } from './router'

const favouriteMiddleware = Middleware(
  ({ params }) => ({ id: params.id }),
  async (_, { id }) => ({ id, name: `Generated${await Promise.resolve(id)}` })
)

const myRoute = Router().get('/items/:id',
  favouriteMiddleware,
  (_, { id, name }) => ({ id, name, name2: name }));

export const clientMyRoute = ClientRoute(myRoute);
export const expressMW = expressify(myRoute);