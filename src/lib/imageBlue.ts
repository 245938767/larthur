'use server';

import sharp from 'sharp';

export const ImageToBlue = async (input: any) => {
  const boxBlurred = await sharp(input)
    .resize(200)
    .blur(25)
    .png({ quality: 30 })
    .jpeg({ quality: 30 })
    .toBuffer({ resolveWithObject: true });
  return boxBlurred;
};
