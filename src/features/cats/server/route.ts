import { CATS_LIMIT_PER_PAGE } from '@/lib/constants';
import { HTTP_STATUS_CODES } from '@/lib/types';
import service from '@/services/api';
import { Hono } from 'hono';

const app = new Hono().get('/', async (ctx) => {
  try {
    const page = Number(ctx.req.query('page')) || 0;
    const limit = Number(ctx.req.query('limit')) || CATS_LIMIT_PER_PAGE;
    const cats = await service.fetchCats({ limit, page });
    return ctx.json(cats);
  } catch (error) {
    console.error(error);
    return ctx.json(
      {
        error: 'Failed to fetch cats',
      },
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
});

export default app;
