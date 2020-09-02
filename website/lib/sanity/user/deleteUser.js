import client from '../config-write';

export async function deleteUser(req, user) {
  console.log('user', user);

  const data = await client
    .delete(user._id)
    .then((res) => {
      console.log('User was deleted');
      return res;
    })
    .catch((err) => {
      console.error('Oh no, the delete failed: ', err.message);
      return false;
    });

  return data;
}
