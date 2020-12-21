import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import httpProxy from 'express-http-proxy';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

import { jsonConfig } from './config/server.config';

(async () => {
  try {
    const {
      nameApplication,
      hostApplication,
      config,
      security,
      services,
    } = await jsonConfig();

    const app = express();

    if (config.enabledMorgan) {
      app.use(logger('dev'));
    }

    if (security.enabledHelmet) {
      app.use(helmet());
    }

    app.get('/', (_, res) => {
      return res.json({ message: 'Running application' });
    });

    services.forEach(({ nameRoute, url }) => { console.log(nameRoute, url);
      // app.use(`/${nameRoute}`, httpProxy(url, { timeout: 3000 }));
      app.use(`/${nameRoute}`, createProxyMiddleware({ target: url, changeOrigin: true, timeout: 3000 }));
    });

    if (security.enabledJSON) {
      app.use(express.json());
    }

    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.listen(config.port, () => {
      console.log(
        `Application ${nameApplication} is running on host ${hostApplication} on port ${config.port}`,
      );
    });
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
})();
