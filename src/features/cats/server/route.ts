import { CATS_LIMIT_PER_PAGE } from '@/lib/constants';
import { HTTP_STATUS_CODES, SortByType } from '@/lib/types';
import service from '@/services/api';
import { Hono } from 'hono';

const app = new Hono()
  .get('/', async (ctx) => {
    try {
      const page = Number(ctx.req.query('page')) || 0;
      const limit = Number(ctx.req.query('limit')) || CATS_LIMIT_PER_PAGE;
      const order = (ctx.req.query('order') as SortByType) || SortByType.RANDOM;
      const breedId = (ctx.req.query('breedId') as SortByType) || '';

      const cats = await service.fetchCats({ limit, page, order, breedId });
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
  })
  .get('/breeds', async (ctx) => {
    try {
      const catBreeds = await service.fetchBreeds();
      return ctx.json({
        breeds: catBreeds,
      });
    } catch (error) {
      console.error(error);
      return ctx.json(
        {
          error: 'Failed to fetch cat breeds',
        },
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  })
  .get('/:id', async (ctx) => {
    try {
      const id = ctx.req.param('id');
      const cat = await service.fetchCatById({ id });
      if (!cat) {
        return ctx.json(
          { error: 'Cat not found' },
          HTTP_STATUS_CODES.NOT_FOUND
        );
      }
      return ctx.json(cat);
    } catch (error) {
      console.error(error);
      return ctx.json(
        {
          error: 'Failed to fetch cat',
        },
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  })
  .post('/favourites', async (ctx) => {
    try {
      const body = await ctx.req.json();
      const id = body['id'];

      if (!id) {
        return ctx.json(
          { message: 'The "id" of the cat is required.' },
          HTTP_STATUS_CODES.BAD_REQUEST
        );
      }

      const response = await service.addCatToFavourites({
        id,
      });

      if (!response || !response.success) {
        return ctx.json(
          { error: 'Could not add cat to favourites' },
          HTTP_STATUS_CODES.NOT_FOUND
        );
      }
      return ctx.json(
        {
          message: 'Added cat to favourites',
        },
        HTTP_STATUS_CODES.CREATED
      );
    } catch (error) {
      console.error(error);
      return ctx.json(
        {
          error: 'Could not add cat to favourites',
        },
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  });

export default app;
