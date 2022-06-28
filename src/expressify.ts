import { RequestHandler, Router } from 'express';
import { RouteDefinition } from './router';

export function expressify(...routeDefinitions: RouteDefinition<any>[]): RequestHandler {
  const router = Router();
  for (const definition of routeDefinitions) {
    (router as any)[definition.method.toLowerCase()](definition.route, async (req: any, res: any, next: any) => {
      res.send(await definition.middleware({ cookies: req.cookies, query: req.query, body: req.body, headers: req.headers, params: req.params }));
    })
  }
  return router;
}