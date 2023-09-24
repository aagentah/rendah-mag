import Cors from 'cors';
import initMiddleware from '~/lib/init-middleware';
import fetchUsers from '~/lib/sanity/user/fetchUsers';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

const discordBotKey = process.env.DISCORD_BOT_KEY;

const handler = async (req, res) => {
  try {
    await cors(req, res);

    // Fetch guild members from Discord
    const memberUrl =
      'https://discord.com/api/v8/guilds/590892540610347008/members?limit=1000';
    const headers = {
      Authorization: `Bot ${discordBotKey}`,
      'Content-Type': 'application/json',
    };

    const memberResponse = await fetch(memberUrl, { headers });
    const memberData = await memberResponse.json();

    // Create a mapping of usernames to Snowflake IDs
    const usernameToID = {};
    memberData.forEach((member) => {
      usernameToID[member.user.username] = member.user.id;
    });

    const users = await fetchUsers();

    const discordIdToUser = {};

    // Create a mapping from your own users data
    for (const user of users) {
      const discordId = usernameToID[user?.discordId];
      if (discordId) {
        discordIdToUser[discordId] = user;
      }
    }

    // Loop over all members from memberData
    for (const member of memberData) {
      const discordId = member.user.id;
      const user = discordIdToUser[discordId];

      const hasRole = member.roles.includes('797997884737323039'); // Role ID you are trying to PUT or DELETE

      // Determine whether the role needs to be updated
      let shouldUpdateRole = false;
      if (user && user?.isDominion && user?.discordId) {
        if (!hasRole) shouldUpdateRole = true;
      } else if (hasRole) shouldUpdateRole = true;

      if (shouldUpdateRole) {
        // Set up your Discord API endpoint and headers
        const apiUrl = `https://discord.com/api/v8/guilds/590892540610347008/members/${discordId}/roles/797997884737323039`;

        // Use fetch to send a PUT or DELETE request to Discord API to update the role
        const response = await fetch(apiUrl, {
          method:
            user && user?.isDominion && user?.discordId ? 'PUT' : 'DELETE',
          headers,
        });

        if (response.ok) {
          console.log(`Role updated for user ${discordId}`);
        } else {
          const text = await response.text();
          console.error(
            `Failed to update role for user ${discordId}. Response: ${text}`
          );
        }
      }
    }

    return res.status(200).json({ message: 'Roles updated successfully' });
  } catch (error) {
    console.error(
      `Error in api/discord/get-dominion-members: ${
        error.message || error.toString()
      }`
    );
    return res.status(500).json({ error: `Error: ${error.message}` });
  }
};

export default handler;
