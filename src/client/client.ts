import { clientRoutes } from '../shared/routes';
import { fetchClient } from './typest/fetchClient';

const client = fetchClient({
  getItems: () => ({ route: clientRoutes.getItems }),
  getItem: (id: string) => ({ params: { id }, route: clientRoutes.getItem }),
  createItem: (body: { name: string, date: Date }) => ({ body, route: clientRoutes.createItem })
}, (accessToken: string) => ({ headers: { 'authorization' : `Bearer ${accessToken}` }}));

export async function runClient() {
  client.setClientState('shhhh');
  console.log(await client.endpoints.getItem('1'));
  try {
    const res = await client.endpoints.createItem({ name: 'Lemon', date: new Date() });
    console.log('Created', res);
  } catch (err) {
    console.log('Error', err);
  }
}