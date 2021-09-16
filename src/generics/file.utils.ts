import { v4 as uuid4 } from 'uuid';
export function editFileName(req, file: Express.Multer.File, callback) {
  const randomName = uuid4() + file.originalname;
  callback(null, randomName);
}
