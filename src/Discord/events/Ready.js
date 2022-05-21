import assets from "../../Game/lib/assets.js";

export const event = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user?.tag}`);
    try {
      client.user.setActivity(client.config.activity);
      client.assets = await assets;
    }
    catch (e) {
      console.log(e);
    }
  }
}