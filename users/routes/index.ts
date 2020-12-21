import { Router, static as staticServer } from 'express';

import AdminUsersApi from './admin/users';
import UsersApi from './api/users';

const app = Router();

app.use('/admin/api/users', AdminUsersApi);
app.use('/api/users', UsersApi);

export default app;
