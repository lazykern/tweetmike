import path from 'path';
import {promises as fs} from 'fs';
import {NextApiRequest, NextApiResponse} from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const jsonDirectory = path.join(process.cwd(), 'json');
  const fileContents = await fs.readFile(
    jsonDirectory + '/2/endpoints.json',
    'utf8'
  );
  const json = JSON.parse(fileContents);
  res.status(200).json(json);
};
