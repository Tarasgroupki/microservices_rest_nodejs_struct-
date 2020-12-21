import { Router } from 'express';
import { adminMiddleware } from '../middleware/admin';

const app = Router();

app.get('/', adminMiddleware(), async (req, res, next) => {
  try {
    res.send({
      status: 'ok',
      data: {
        users: [
          {
            name: 'Admin',
            surname: 'Admin Y',
          },
          {
            name: 'Admin F',
            surname: 'Admin R',
          },
          {
            name: 'Admin B',
            surname: 'Admin M',
          },
        ],
      },
    });
  } catch (err) {
    next(err);
  }
});

app.param('id', async (req, res, next, value) => {
  try {
    // const car = await Car.findById(value).populate('mark').populate('color').populate('driver');

    // if (!car) {
    // throw new EntityNotFountError('Car', `id = ${value}`);
    // }

    // req.car = car;
    next();
  } catch (err) {
    return next(err);
  }
});

app.get('/:id/', async (req, res, next) => {
  try {
    res.send({
      status: 'ok',
      data: {
        id: req.params.id,
        name: 'Admin',
        surname: 'Admin Y',
      },
    });
  } catch (err) {
    next(err);
  }
});

export default app;
