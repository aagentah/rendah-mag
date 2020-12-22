import client from '../config-write';

const findUserByUsername = async (req, username) => {
  try {
    // Here you find the user based on id/username in the database
    const query = '*[_type == "user" && username == $username] [0] { ..., }';
    const params = { username };

    const data = await client.fetch(query, params).then((res) => {
      console.log(`User was fetched, document ID is ${res._id}`);
      return res;
    });

    return data;
  } catch (error) {
    console.error(
      `Error in findUserByUsername(): ${error.message || error.toString()}`
    );

    return false;
  }
};

export default findUserByUsername;
