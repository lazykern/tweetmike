const dev = process.env.NODE_ENV !== 'production';

export const server = dev
  ? 'http://localhost:3000'
  : 'https://tweetmike.vercel.app';

export const twitterApiVersions = ['2', '1.1'];

export const defaultTwitterApiVersion = '2';

export const twitterApiBaseUrl = 'https://api.twitter.com';

export const requestMethods = ['GET', 'POST', 'PUT', 'DELETE'];
