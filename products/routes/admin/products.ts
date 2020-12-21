import { Router } from 'express';
import { adminMiddleware } from '../middleware/admin';

const app = Router();

app.get('/', adminMiddleware(), async (req, res, next) => {
  try {
    res.send({
      status: 'ok',
      data: {
        products: [
          {
            title: 'Item 1',
            description: 'This is the first item.',
          },
          {
            title: 'Item 2',
            description: 'This is the second item.',
          },
          {
            title: 'Item 3',
            description: 'This us the third item.',
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

app.get('/:id/', adminMiddleware(), async (req, res, next) => {
  try {
    res.send({
      status: 'ok',
      data: {
        id: req.params.id,
        title: 'Item 1',
        description: 'This is the first item.',
      },
    });
  } catch (err) {
    next(err);
  }
});

export default app;
