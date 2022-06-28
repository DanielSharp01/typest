import { expressify } from './typest/expressify';
import { implement, Unauthorized } from './typest/implement';
import { routes } from '../shared/routes';
import { Middleware } from './typest/middleware';

const items = [{ id: '1', name: 'Apple', date: new Date() }, { id: '2', name: 'Banana', date: new Date()}]

const authMW = (require: boolean) => Middleware(({ headers }) => {
  if (!headers.authorization?.startsWith('Bearer ')) return { authed: false };
  const token = headers.authorization.split(' ')[1];
  if (token !== 'shhhh') return { authed: false };
  else return { authed: true };
}, (_, { authed }) => {
  if (require && !authed) throw Unauthorized({ error: 'Unauthenticated' });
  return undefined;
})

const routesImp = {
  getItems: implement(routes.getItems,
    authMW(false),
    () => items
  ),
  getItem: implement(routes.getItem,
    authMW(false),
    ({ params }) => items.find(({ id }) => id === params.id)
  ),
  createItem: implement(routes.createItem,
    authMW(true),
    ({ body }: any) => {
      const created = { id: (items.length + 1).toString(), name: body.name as string, date: new Date() };
      items.push(created);
      return created;
    }
  ),
};

export type routesType = typeof routesImp;

export const expressMW = expressify(routesImp);