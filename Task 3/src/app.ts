import express from 'express';
import bodyParser from 'body-parser';
import clientsRouter from './resources/client/client.router';
import productsRouter from './resources/products/products.router';
import ordersRouter from './resources/orders/orders.router';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/clients', clientsRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

export default app;