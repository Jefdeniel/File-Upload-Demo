/**
 * Upload middeleware
 * a user can upload a file via the browser
 * the middleware will save the file to the server
 */

import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { PUBLIC_PATH } from '../consts.js';

// Async functie want duurt even voordat de file is opgeslagen

export const saveAvatar = async (req, res, next) => {
  // get the file from the request.
  const file = req.file;

  console.log(`the file is: ${file}`);

  // if no file is uploaded, continue to the next middleware
  if (!file) return next();

  // check if the file is an image
  if (
    // pdf can't be resized with sharp, so we don't allow it
    file.mimetype == 'image/png' ||
    file.mimetype == 'image/jpg' ||
    file.mimetype == 'image/jpeg' ||
    file.mimetype == 'image/gif' ||
    file.mimetype == 'image/webp'
  ) {
    const extension = file.originalname.split('.').pop(); // jpg, png, gif, webp

    // create a unique filename
    const uniqueFileName = uuidv4() + '.' + extension;

    await sharp(file.buffer)
      .resize(128, 128, {
        fit: sharp.fit.cover,
        withoutEnlargement: true,
      })
      // .tint({ r: 255, g: 0, b: 0 })
      .toFile(`${PUBLIC_PATH}/images/avatars/${uniqueFileName}.webp`);
  } else {
    console.log('file is not an image'); // console
    res.send('file is not an image'); // browser
  }
  next(); // continue to the next middleware
};
