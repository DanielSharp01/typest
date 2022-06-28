import { routes } from '../../server/src/shared/routes';
import type { routesType } from '../../server/src/routes_impl';
import { ClientRoutes, fetchClient } from '@typest/client'

const clientRoutes = ClientRoutes<routesType>(routes);

const client = fetchClient({
  getItems: () => ({ route: clientRoutes.getItems }),
  getItem: (id: string) => ({ params: { id }, route: clientRoutes.getItem }),
  createItem: (body: { name: string, date: Date }) => ({ body, route: clientRoutes.createItem })
}, (accessToken: string) => ({ headers: { 'authorization' : `Bearer ${accessToken}` }}));

async function runClient() {
  client.setClientState('shhhh');
  console.log(await client.endpoints.getItem('1'));
  try {
    const res = await client.endpoints.createItem({ name: 'Lemon', date: new Date() });
    console.log('Created', res);
  } catch (err) {
    console.log('Error', err);
  }0
}

runClient();