import { Router, static as staticServer } from 'express';

import AdminProductsApi from  './admin/products';
import ProductsApi from './api/products';

const app = Router();

app.use('/admin/api/products', AdminProductsApi);
app.use('/api/products', ProductsApi);

export default app;
