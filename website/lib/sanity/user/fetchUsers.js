import client from '../config-write';

const fetchUsers = async (username) => {
  try {
    // Here you find the user based on id/username in the database
    const query = '*[_type == "user"] { name, isDominion }';

    const data = await client.fetch(query).then((res) => {
      return res;
    });

    return data;
  } catch (error) {
    console.error(
      `Error in fetchUsers(): ${error.message || error.toString()}`
    );

    return false;
  }
};

export default fetchUsers;
