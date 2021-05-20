import initMiddleware from '~/lib/init-middleware';
import fetchUsers from '~/lib/sanity/user/fetchUsers';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

const handler = async (req, res) => {
  try {
    // Run cors
    await cors(req, res);

    const users = await fetchUsers();
    return res.json({ users });
  } catch (error) {
    // Handle catch
    console.error(
      `Error in api/sanity/compress-image: ${error.message || error.toString()}`
    );

    return res
      .status(500)
      .json({ error: `Error compressing image: ${error.message}` });
  }
};

export default handler;
