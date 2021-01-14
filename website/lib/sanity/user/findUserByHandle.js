import client from '../config-write';

const findUserByHandle = async (handle) => {
  try {
    // Here you find the user based on handle in the database
    const query = '*[_type == "user" && handle == $handle] [0] { ..., }';
    const params = { handle };

    const data = await client.fetch(query, params).then((res) => {
      console.log(`User was fetched, document ID is ${res._id}`);
      return res;
    });

    return data;
  } catch (error) {
    console.error(
      `Error in findUserByHandle(): ${error.message || error.toString()}`
    );

    return false;
  }
};

export default findUserByHandle;
