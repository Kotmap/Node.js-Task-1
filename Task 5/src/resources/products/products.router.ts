import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';

import Products from './products.model';
import productsService from './products.service';
import catchErrors from '../../common/catchErrors';

const router = Router({ mergeParams: true });

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const products = await productsService.getAll();

    res.json(products.map(Products.toResponse));
  }),
);

router.route('/').post(
  catchErrors(async (req: Request, res: Response) => {
    const { ordersId } = req.params;
    const { name, price, ageOfIssue, lifeTime, clientId } = req.body;

    const products = await productsService.createProducts({
      name,
    price,
    ageOfIssue,
    lifeTime,
      clientId,
      ordersId: ordersId || '',
    });

    if (products) {
      res.status(StatusCodes.CREATED).json(Products.toResponse(products));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  }),
);

router.route('/:id').get(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const products = await productsService.getById(id || '');

    if (products) {
      res.json(Products.toResponse(products));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'Products_NOT_FOUND', msg: 'Products not found' });
    }
  }),
);

router.route('/:id').put(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ordersId } = req.params;
    const { name, price, ageOfIssue, lifeTime, clientId } = req.body;

    const products = await productsService.updateById({
      id: id || '',
      name,
    price,
    ageOfIssue,
    lifeTime,
    clientId,
      ordersId: ordersId || '',
    });

    if (products) {
      res.status(StatusCodes.OK).json(Products.toResponse(products));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'Products_NOT_FOUND', msg: 'Products not found' });
    }
  }),
);

router.route('/:id').delete(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const products = await productsService.deleteById(id || '');

    if (products) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'Products_DELETED', msg: 'The Products has been deleted' });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'Products_NOT_FOUND', msg: 'Products not found' });
    }
  }),
);

export default router;