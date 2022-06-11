import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';

import Orders from './orders.model';
import { TOrders } from './orders.type';

import ordersService from './orders.service';
import catchErrors from '../../common/catchErrors';

const router = Router();

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const orders = await ordersService.getAll();

    res.json(orders.map(Orders.toResponse));
  }),
);

router.route('/').post(
  catchErrors(async (req: Request, res: Response) => {
    const { productId, columns, numbers, orderNumber, clientId }: TOrders = req.body;

    const orders = await ordersService.createOrders({ productId, columns, numbers, orderNumber, clientId });

    if (orders) {
      res.status(StatusCodes.CREATED).json(Orders.toResponse(orders));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'orders_NOT_CREATE', msg: 'orders not create' });
    }
  }),
);

router.route('/:id').get(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const orders = await ordersService.getById(id || '');

    if (orders) {
      res.json(Orders.toResponse(orders));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'orders_NOT_FOUND', msg: 'orders not found' });
    }
  }),
);

router.route('/:id').put(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { productId, columns, numbers, orderNumber, clientId } = req.body;

    const orders = await ordersService.updateById({ id: id || '', productId, columns, numbers, orderNumber, clientId });

    if (orders) {
      res.status(StatusCodes.OK).json(Orders.toResponse(orders));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'orders_NOT_FOUND', msg: 'orders not found' });
    }
  }),
);

router.route('/:id').delete(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const orders = await ordersService.deleteById(id || '');

    if (!orders) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'orders_NOT_FOUND', msg: 'orders not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'orders_DELETED', msg: 'The orders has been deleted' });
  }),
);

export default router;