export const emailConfig = {
  from: 'hi@cali.so',
  baseUrl:
    process.env.VERCEL_ENV === 'production'
      ? `https://larthur.vercel.app`
      : 'http://localhost:3000',
}
