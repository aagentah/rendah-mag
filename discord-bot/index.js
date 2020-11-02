// Discord.js client
const { Client } = require("discord.js");
const client = new Client({
  partials: ["USER", "GUILD_MEMBER", "MESSAGE", "CHANNEL", "REACTION"],
});

const guildId = "590892540610347008";

const channelIds = {
  pickYourRole: "771414803600244736",
};

const messageIds = {
  pickYourRole: "771521982868619305",
};

const emojis = {
  heart: {
    symbol: "",
    id: "771521982868619305",
  },
};

client.on("ready", async () => {
  client.user.setActivity("Rendah Cyphers", { type: "LISTENING" });

  const m = await client.guilds
    .get(guildId)
    .channels.get(channelIds.pickYourRole)
    .fetchMessages();

  // client.channels.cache
  //   .get("771414803600244736")
  //   .messages.fetch({ limit: 1 })
  //   .then((messages) => {
  //     var lastMessage = messages.first();
  //     console.log("lastMessage", lastMessage);
  //   });
});

client.on("message", (msg) => {
  // if (!msg.content.startsWith(process.env.PREFIX) || !msg.guild) return;
  // const command = msg.content.split(" ")[0].substr(process.env.PREFIX.length);
  // const args = msg.content.split(" ").slice(1).join(" ");
  // if (command === "guide")
  //   return msg.channel.send("https://git.io/d.js-heroku");
  // else if (command === "invite") return msg.channel.send(process.env.INVITE);

  const channel = msg.channel;
  const channelId = channel.id;
  const guild = channel.guild;
  const member = guild.members.get(msg.member.user.id);
  const roles = guild.roles;

  // Roles
  const roleArtist = roles.find((role) => role.name === "artist");

  if (channelId === channelIds.pickYourRole) {
    if (msg.content === "😄") {
      member.addRole(roleArtist);
    }
  }

  // if (msg.content === "ping") {
  //   msg.reply("pong");
  //   msg.channel.send("pong");
  // }
});

// You can also try to upgrade partials to full instances:
client.on("messageReactionAdd", async (reaction, user) => {
  console.log("reaction", reaction);
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  console.log(`${reaction.emoji.name}`);

  await reaction.remove(emojis.heart.id);

  // switch (reaction.emoji.name) {
  //   case expression:
  //     break;
  //   default:
  // }
});

client.login(process.env.TOKEN);
