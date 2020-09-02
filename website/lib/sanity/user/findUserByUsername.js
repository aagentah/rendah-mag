import client from '../config-write';

export async function findUserByUsername(req, username) {
  // Here you find the user based on id/username in the database
  const query = '*[_type == "user" && username == $username][0] {...,}';
  const params = { username };

  const data = await client.fetch(query, params).then((res) => {
    console.log(`User was fetched, document ID is ${res._id}`);
    return res;
  });

  return data;
}
