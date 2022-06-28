import { clientMyRoute } from './routes';

export async function runClient() {
  const a: typeof clientMyRoute['type'] = await fetch('http://localhost:4000' + clientMyRoute.route.replace(':id', '1'), { method: clientMyRoute.method }).then(res => res.json());
  console.log(a);
}