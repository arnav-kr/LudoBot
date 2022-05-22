import { Client, Collection } from "discord.js";
import Config from "./config.js";
import { readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import dotenv from "dotenv";
dotenv.config();

export default class extends Client {
  constructor(options) {
    super(options);
    this.commands = new Collection();
    this.slashCommands = new Collection();
    this.events = new Collection();
    this.aliases = new Collection();
    this.config = Config;
    this.ongoingMatches = [];
    this.engazedPlayers = [];
  }

  getEmoji(name) {
    return this.emojis.cache.find(emoji => emoji.name === name);
  }

  // Init Client
  async init() {
    this.login();
    // making token null then delete to prevent exposure from unintentional memory leakage
    process.env.DISCORD_TOKEN = null;
    delete process.env.DISCORD_TOKEN;

    // Commands
    const cmdPath = join(__dirname, '..', 'commands');
    const cmdFiles = readdirSync(cmdPath).filter((file) => file.endsWith('.js'));

    cmdFiles.forEach(async (file) => {
      const { command: cmd } = await import(`file:///${cmdPath}/${file}`);
      cmd.displayName = this.config.prefix + cmd.name;
      this.commands.set(cmd.name, cmd);

      if (cmd?.aliases?.length) {
        cmd.aliases.forEach((alias) => {
          this.aliases.set(alias, cmd)
        });
      }
    });

    //Slash Commands
    const slashCmds = [];
    const slashCmdsPath = join(__dirname, '..', 'slashCommands');
    const slashCmdsFiles = readdirSync(slashCmdsPath).filter(f => f.endsWith('.js'));

    slashCmdsFiles.forEach(async filePath => {
      const { command: slashCmd } = await import(`file:///${slashCmdsPath}/${filePath}`);
      slashCmd.displayName = "/" + slashCmd.name;
      this.slashCommands.set(slashCmd.name, slashCmd);
      slashCmds.push(slashCmd);
    })

    // Events
    const eventsPath = join(__dirname, '..', 'events');
    const eventFiles = readdirSync(eventsPath).filter(f => f.endsWith('js'));

    eventFiles.forEach(async (file) => {
      const { event } = await import(`file:///${eventsPath}/${file}`);
      this.events.set(event.name, event);
      if (event.once) this.once(event.name, event.execute.bind(null, this));
      else this.on(event.name, event.execute.bind(null, this));
    });
  }

  async registerSlashCommand({ guildId, commands }) {
    if (guildId) {
      // Set the commands to the guild
      return await this.guilds.cache.get(guildId)?.commands
        .set(commands)
        .then(() => {
          console.log(`Registering Commands to ${guildId}`);
          return true
        })
        .catch((e) => { console.log(e); return false })
    }
    else {
      // Register globally
      this.application?.commands.set(commands);
      console.log(`Registering global Commands.`)
      return true;
    }
  }
}