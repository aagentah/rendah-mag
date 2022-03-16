// Discord.js client

require("dotenv").config();
const _ = require("lodash");
const fetch = require("node-fetch");
const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS
  ]
});

// Vars

const guildId = "590892540610347008";

// Functions

const getGuild = () => {
  return client.guilds.cache.get(guildId);
};

const handleDeleteStickers = () => {
  setInterval(() => {
    const channel = client.channels.cache.get("595730178697723910");

    channel.messages.fetch({ limit: 100 }).then(messages => {
      messages.forEach(message => {
        if (message?.stickers?.size == 1) {
          message.delete();
        }
      });
    });
  }, 3600000);
};

const handleDominionRoles = () => {
  const action = async () => {
    // Fetch Sanity users
    const sanityUsers = await fetch(
      `https://rendahmag.com/api/discord/get-dominion-members`
      // "https://26a938295485.ngrok.io/api/discord/get-dominion-members"
    ).then(res => res.json());

    // Loop guild members
    getGuild().members.cache.forEach(member => {
      // Match with sanity user based on Discord ID
      const matched = _.find(sanityUsers, {
        discordId: member.user.discriminator
      });

      if (matched && matched.isDominion) {
        // Add 'dominion' role
        member.roles.add("797997884737323039");
      } else {
        // Remove 'dominion' role
        member.roles.remove("797997884737323039");
      }
    });
  };

  action();

  setInterval(() => {
    action();
  }, 3600000);
};

const handleDiscordBlog = () => {
  const getAuthorNames = authors => {
    let string = "";
    let authorDiscord;
    let author;

    for (let i = 0; i < authors.length; i++) {
      author = authors[i].author;
      authorDiscord = client.users.get(author.discordId);

      if (authorDiscord) {
        string += authorDiscord.toString();
      } else {
        string += author.name;
      }

      if (i + 1 !== authors.length) {
        string += " & ";
      }
    }

    return string;
  };

  const action = async () => {
    const feed = await fetch(
      `https://rendahmag.com/api/discord/get-latest-articles`
      // "https://c59b-194-37-96-102.ngrok.io/api/discord/get-latest-articles"
    ).then(res => res.json());

    for (let i = 0; i < feed.length; i++) {
      const post = feed[i];

      client.channels.cache
        .get("934109364879507537")
        .send(
          `New post up from ${getAuthorNames(
            post.authors
          )}!\n\nhttps://rendahmag.com/article/${post.slug}`
        );
    }
  };

  action();

  setInterval(() => {
    action();
  }, 3600000);
};

client.on("ready", async () => {
  console.log("Discord bot Active!");

  client.user.setActivity("Rendah Cyphers", { type: "LISTENING" });

  handleDominionRoles();
  handleDiscordBlog();
  handleDeleteStickers();
});

client.on("message", m => {
  const names = [
    "boi",
    "g",
    "gangsta",
    "rudeboi",
    "pls",
    "bruuh",
    "lmao",
    "pls"
  ];

  m.mentions.users.forEach((item, i) => {
    // Is bot
    if (i === client.user.id) {
      m.channel.send(`Catch me ${_.sample(names)}`);
    }
  });
});

client.login(process.env.TOKEN);
