import { clientMyRoute } from './routes';
import { fetchClient } from './fetchClient';

const client = fetchClient({
  getMyRoute: (id: string) => ({ params: { id }, route: clientMyRoute })
});

export async function runClient() {
  const a = await client.getMyRoute('1');
  console.log(a.name3);
  const b = await client.getMyRoute('2')
  console.log(b.name3);
}