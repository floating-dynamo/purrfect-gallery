export const apiRoutes = {
  cats: '/api/cats',
  breeds: '/api/cats/breeds',
} as const;

export const CATS_LIMIT_PER_PAGE =
  Number(process.env.NEXT_PUBLIC_CATS_LIMIT_PER_PAGE) || 15;
