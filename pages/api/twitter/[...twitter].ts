import {getCookie} from 'cookies-next';
import {NextApiRequest, NextApiResponse} from 'next';
import Twitter from 'twitter-lite';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    res.status(405).json({error: 'Method Not Allowed'});
  }

  if (!req.query || !req.query.twitter ) {
    return res.status(400).json({error: 'Missing query'});
  }

  if (
    !getCookie('twitter_access_token', {req, res}) ||
    !getCookie('twitter_token_secret', {req, res})
  ) {
    return res.status(401).json({error: 'Unauthorized'});
  }

  const client = new Twitter({
    version: '2',
    extension: false,
    consumer_key: process.env.TWITTER_CONSUMER_KEY!,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET!,
    access_token_key: getCookie('twitter_access_token', {req, res})?.toString(),
    access_token_secret: getCookie('twitter_token_secret', {req, res})?.toString(),
  })

  let {twitter: endpoint} = req.query;


  client.get(
  (<string[]>endpoint).join('/')
  ).then(data => {
    console.log(data);
    return data;
  }).catch(err => {
    console.log(err);
    return err;
  })

  let result = {} as any;
  try {
    result = await client.get(
      (<string[]>endpoint).join('/')
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({error: err});
  } finally {
    console.log(result);
    return res.status(200).json(result);
  }
};
