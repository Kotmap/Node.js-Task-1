import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';

import Client from './client.model';
import clientService from './client.service';
import catchErrors from '../../common/catchErrors';

const router = Router({ mergeParams: true });

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const clients = await clientService.getAll();

    res.json(clients.map(Client.toResponse));
  }),
);

router.route('/').post(
  catchErrors(async (req: Request, res: Response) => {
    const { id, fullName, adress, numberPhone, bonusCard, } = req.body;

    const client = await clientService.createClient({
      id,
    fullName,
    adress,
    numberPhone,
    bonusCard,
    });

    if (client) {
      res.status(StatusCodes.CREATED).json(Client.toResponse(client));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  }),
);

router.route('/:id').get(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const client = await clientService.getById(id || '');

    if (client) {
      res.json(Client.toResponse(client));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
    }
  }),
);

router.route('/:id').put(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      fullName,
      adress,
      numberPhone,
      bonusCard} = req.body;

    const client = await clientService.updateById({
      id: id || '',
    fullName,
    adress,
    numberPhone,
    bonusCard,
    });

    if (client) {
      res.status(StatusCodes.OK).json(Client.toResponse(client));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
    }
  }),
);

router.route('/:id').delete(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    const client = await clientService.deleteById(id || '');

    if (client) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'TASK_DELETED', msg: 'The task has been deleted' });
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'TASK_NOT_FOUND', msg: 'Task not found' });
    }
  }),
);

export default router;