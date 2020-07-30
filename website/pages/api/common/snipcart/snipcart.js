import request from 'request';

export default async () => {
  function query() {
    return new Promise((resolve) => {
      request(
        {
          url: 'http://app.snipcart.com/api/products',
          auth: {
            user: process.env.SNIPCART_SECRET_KEY,
          },
          method: 'GET',
          json: true,
        },
        (error, response) => {
          resolve(response.body);
        }
      );
    });
  }

  async function action() {
    const data = await query();
    return data;
  }

  return action();
};
