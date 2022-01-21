// Discord.js client

const _ = require("lodash");
const fetch = require("node-fetch");
const { Client } = require("discord.js");
const Parser = require("rss-parser");

const client = new Client({
  partials: ["USER", "GUILD_MEMBER", "MESSAGE", "CHANNEL", "REACTION"],
});

// Vars

const guildId = "590892540610347008";

// Functions

const getGuild = () => {
  return client.guilds.get(guildId);
};

const handleDominionRoles = () => {
  const action = async () => {
    // Fetch Sanity users
    const sanityUsers = await fetch(
      `https://rendahmag.com/api/discord/get-dominion-members`
      // "https://26a938295485.ngrok.io/api/discord/get-dominion-members"
    ).then((res) => res.json());

    // Loop guild members
    getGuild().members.forEach((member) => {
      // Match with sanity user based on Discord ID
      const matched = _.find(sanityUsers, {
        discordId: member.user.discriminator,
      });

      if (matched && matched.isDominion) {
        // Add 'dominion' role
        member.addRole("797997884737323039");
      } else {
        // Remove 'dominion' role
        member.removeRole("797997884737323039");
      }
    });
  };

  action();

  setInterval(() => {
    action();
  }, 3600000);
};

const handleDiscordBlog = () => {
  const action = async () => {
    const feed = await fetch(
      `https://rendahmag.com/api/discord/get-latest-articles`
      // "https://001f-2a01-4c8-1400-44c3-351a-d0f3-2d05-86d1.ngrok.io/api/discord/get-latest-articles"
    ).then((res) => res.json());

    for (let i = 0; i < feed.length; i++) {
      const post = feed[i];

      if (!post.hasPostedDiscord) {
        client.channels
          .get("934109364879507537")
          .send(`https://rendahmag.com/article/${post.slug}`);
      }
    }
  };

  setInterval(() => {
    action();
  }, 3600000);
};

client.on("ready", async () => {
  console.log("Discord bot Active!");

  client.user.setActivity("Rendah Cyphers", { type: "LISTENING" });

  handleDominionRoles();
  handleDiscordBlog();
});

client.login(process.env.TOKEN);
