import client from '../config-write';

const deleteUser = async (req, user) => {
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
};

export default deleteUser;
