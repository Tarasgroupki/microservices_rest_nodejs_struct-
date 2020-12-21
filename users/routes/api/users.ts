import { Router } from 'express';
import { userMiddleware } from "../middleware/auth";

const app = Router();

app.get('/', userMiddleware(), async (req, res, next) => {
  try {
    res.send({
      status: 'ok',
      data: {
        users: [
          {
            name: 'Mister X',
            surname: 'Mester Y',
          },
          {
            name: 'Mister F',
            surname: 'Mester R',
          },
          {
            name: 'Mister B',
            surname: 'Mester M',
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
        name: 'Mister X',
        surname: 'Mister Y',
      },
    });
  } catch (err) {
    next(err);
  }
});

export default app;
