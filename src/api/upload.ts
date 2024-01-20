'use server';
export const uploadImgur = async (image: any) => {
  const fd = new FormData();
  if (typeof image === 'string') {
    image = image.replace(/^data:.+base64,/, '');
  }
  fd.append('image', image);
  fd.append('type', 'base64');
  const response = await fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
    },
    body: fd,
    redirect: 'follow',
  });
  const data = await response.json();
  return data;
};
