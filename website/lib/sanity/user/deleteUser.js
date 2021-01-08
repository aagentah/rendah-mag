import client from '../config-write';

const deleteUser = async (req, user) => {
  try {
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
  } catch (error) {
    console.error(
      `Error in deleteUser(): ${error.message || error.toString()}`
    );
    return false;
  }
};

export default deleteUser;
