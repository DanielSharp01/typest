import { ClientRoutes, Router } from './typest/router'
import type { routesType } from '../server/routes_impl';
import { mapDatesFromZString, mapDatesToZString } from './mapDates';

const router = Router();
router.useTransformation({
  toTransmission: mapDatesToZString,
  fromTransmission: mapDatesFromZString
})
export const routes = {
  getItems: router.get('/items'),
  getItem: router.get('/items/:id'),
  createItem: router.post('/items')
}

export const clientRoutes = ClientRoutes<routesType>(routes);