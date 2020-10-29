require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const Discord = require("discord.js");
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

app.get("/", (request, response) => {
  console.log("bot", bot);
  bot.login(TOKEN);

  bot.on("ready", () => {
    console.info(`Logged in as ${bot.user.tag}!`);
  });

  bot.on("message", (msg) => {
    if (msg.content === "ping") {
      msg.reply("pong");
      msg.channel.send("pong");
    } else if (msg.content.startsWith("!kick")) {
      if (msg.mentions.users.size) {
        const taggedUser = msg.mentions.users.first();
        msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
      } else {
        msg.reply("Please tag a valid user!");
      }
    }
  });
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
