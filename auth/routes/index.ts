import { Router, static as staticServer } from 'express';

import AdminAuthApi from './admin/auth';
import AuthApi from './api/auth';

const app = Router();

app.use('/admin/api/auth', AdminAuthApi);
app.use('/api/auth', AuthApi);

export default app;
