import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import catRoutes from '@/features/cats/server/route';

export const runtime = 'nodejs';

const app = new Hono().basePath('/api').route('/cats', catRoutes);

export const GET = handle(app);
