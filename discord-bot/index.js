// Discord.js bot
const Discord = require("discord.js");
const bot = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION", "USER"],
});

bot.on("ready", () => {
  bot.user.setActivity("Rendah Cyphers", { type: "LISTENING" });
});

// bot.on("messageReactionAdd", async (reaction, user) => {
//   console.log("reaction", reaction);
//   console.log("user", user);
//   // When we receive a reaction we check if the reaction is partial or not
//   // if (reaction.partial) {
//   // 	// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
//   // 	try {
//   // 		await reaction.fetch();
//   // 	} catch (error) {
//   // 		console.error('Something went wrong when fetching the message: ', error);
//   // 		// Return as `reaction.message.author` may be undefined/null
//   // 		return;
//   // 	}
//   // }
//   // Now the message has been cached and is fully available
//   console.log(
//     `${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`
//   );
//   // The reaction is now also fully available and the properties will be reflected accurately:
//   console.log(
//     `${reaction.count} user(s) have given the same reaction to this message!`
//   );
// });

bot.on("message", (msg) => {
  const channel = msg.channel;
  const channelId = channel.id;
  const guild = channel.guild;
  const member = guild.members.get(msg.member.user.id);
  const roles = guild.roles;

  const channelIds = {
    pickYourRole: "771414803600244736",
  };

  // Roles
  const roleArtist = roles.find((role) => role.name === "artist");

  //
  if (channelId === channelIds.pickYourRole) {
    if (msg.content === "😄") {
      member.addRole(roleArtist);
    }
  }
  // if (!msg.content.startsWith(process.env.PREFIX) || !msg.guild) return;
  // const command = msg.content.split(" ")[0].substr(process.env.PREFIX.length);
  // const args = msg.content.split(" ").slice(1).join(" ");
  // if (command === "guide")
  //   return msg.channel.send("https://git.io/d.js-heroku");
  // else if (command === "invite") return msg.channel.send(process.env.INVITE);

  // if (msg.content === "ping") {
  //   msg.reply("pong");
  //   msg.channel.send("pong");
  // } else if (msg.content.startsWith("!kick")) {
  //   if (msg.mentions.users.size) {
  //     const taggedUser = msg.mentions.users.first();
  //     msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
  //   } else {
  //     msg.reply("Please tag a valid user!");
  //   }
  // }
});

bot.login(process.env.TOKEN);

//
// const Discord = require("discord.js");
// const bot = new Discord.Client();
// const TOKEN = process.env.TOKEN;
//
// bot.login(TOKEN);
//
// bot.on("ready", () => {
//   console.info(`Logged in as ${bot.user.tag}!`);
// });
//
// bot.on("message", (msg) => {
//   if (msg.content === "ping") {
//     msg.reply("pong");
//     msg.channel.send("pong");
//   } else if (msg.content.startsWith("!kick")) {
//     if (msg.mentions.users.size) {
//       const taggedUser = msg.mentions.users.first();
//       msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
//     } else {
//       msg.reply("Please tag a valid user!");
//     }
//   }
// });
