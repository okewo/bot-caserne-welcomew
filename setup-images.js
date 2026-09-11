// Change l'avatar et la bannière du bot.
// À lancer UNE SEULE FOIS : node setup-images.js  (rate limit : 2 changements / heure)
require('dotenv').config();
const { Client } = require('discord.js');

const client = new Client({ intents: [] });

client.once('clientReady', async () => {
  try {
    await client.user.setAvatar('./avatar.png');
    console.log('✅ Avatar mis à jour');
  } catch (e) { console.error('Avatar :', e.message); }

  try {
    await client.user.setBanner('./banner.png');
    console.log('✅ Bannière mise à jour');
  } catch (e) { console.error('Bannière :', e.message); }

  client.destroy();
});

client.login(process.env.TOKEN);
