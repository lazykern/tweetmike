import {getCookie} from 'cookies-next';
import {NextApiRequest, NextApiResponse} from 'next';
import Twitter from 'twitter-lite';
import {TwitterApi} from 'twitter-api-v2';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query) {
    return res.status(400).json({
      error: {
        code: 400,
        message: 'Bad Request',
        details: 'No query parameters provided',
      },
    });
  }

  if (
    !getCookie('twitter_access_token', {req, res}) ||
    !getCookie('twitter_token_secret', {req, res})
  ) {
    return res.status(401).json({
      error: {
        code: 401,
        message: 'Unauthorized',
        details: 'No access token provided. Please login first.',
      },
    });
  }

  const userClient = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY!,
    appSecret: process.env.TWITTER_CONSUMER_SECRET!,
    accessToken: getCookie('twitter_access_token', {req, res})?.toString(),
    accessSecret: getCookie('twitter_token_secret', {req, res})?.toString(),
  });

  const client = userClient.v1;

  let query = req.query;
  const endpoint = (query.slug as string[]).join('/');
  delete query.slug;
  try {
    if (req.method === 'GET') {
      const response = await client.get(endpoint, {...query});
      return res.status(200).json(response);
    } else if (req.method === 'POST') {
      const response = await client.post(endpoint, {...query});
      return res.status(200).json(response);
    } else if (req.method === 'DELETE') {
      const response = await client.delete(endpoint, {...query});
      return res.status(200).json(response);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};
