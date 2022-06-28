import { RequestHandler, Router } from 'express';
import { ImplementedRouteDefinition, Unauthorized } from '@typest/server'

export function createExpressRouter(routeDefinitions: Record<string, ImplementedRouteDefinition<any>>): RequestHandler {
  const router = Router();
  for (const definition of Object.values(routeDefinitions)) {
    (router as any)[definition.method.toLowerCase()](definition.route, async (req: any, res: any, next: any) => {
      const fromTransmission = definition.transformation?.fromTransmission ?? ((x: any) => x);
      const toTransmission = definition.transformation?.toTransmission ?? ((x: any) => x);
      const response = await definition.middleware({ cookies: req.cookies, query: req.query, body: fromTransmission(req.body), headers: req.headers, params: req.params }).catch((res: any) => {
        if (res.__statusCode) return res;
        else return Unauthorized(res);
      });
      if (response.__statusCode) res.status(response.__statusCode);
      delete response.__statusCode;
      res.send(toTransmission(response));
    })
  }
  return router;
}