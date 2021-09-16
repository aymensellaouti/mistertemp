import { v4 as uuid4 } from 'uuid';
import { BadRequestException } from "@nestjs/common";
export function editFileName(req, file: Express.Multer.File, callback) {
  const randomName = uuid4() + file.originalname;
  callback(null, randomName);
}

export function fileFilter(req, file: Express.Multer.File, callback) {
  if (!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)) {
    callback(
      new BadRequestException(
        'Vous pouvez uniquement utiliser les images de types jpeg, jpg, png et gif',
      ),
      false,
    );
  }
  callback(null, true);
}
