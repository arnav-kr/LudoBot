import CustomClient from '#discord/client/index';
import { Intents } from "discord.js";

const client = new CustomClient({
  intents: [
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,

    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  ],
  partials: ["CHANNEL"]
});

client.init();

process.on("unhandledRejection", console.log)