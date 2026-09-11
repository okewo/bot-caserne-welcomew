require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActivityType, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});

client.once('clientReady', () => {
  console.log(`✅ Connecté en tant que ${client.user.tag}`);

  client.user.setPresence({
    status: config.presence.status,
    activities: [{
      name: config.presence.activity,
      type: ActivityType[config.presence.type]
    }]
  });
});

client.on('guildMemberAdd', async (member) => {
  try {
    const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL);
    if (!channel) return console.error('❌ Salon de bienvenue introuvable (vérifie WELCOME_CHANNEL dans .env)');

    const created = `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`;

    const embed = new EmbedBuilder()
      .setColor(config.embed.color)
      .setTitle(config.embed.title)
      .setDescription(
        config.embed.description
          .replace('{user}', `${member}`)
          .replace('{count}', member.guild.memberCount)
          .replace('{created}', created)
      )
      .setThumbnail(member.user.displayAvatarURL({ size: 256 }))
      .setFooter({ text: config.embed.footer });

    const files = [];
    if (config.embed.image) {
      if (config.embed.image.startsWith('http')) {
        embed.setImage(config.embed.image);
      } else if (fs.existsSync(config.embed.image)) {
        const name = config.embed.image.split(/[\\/]/).pop();
        files.push(new AttachmentBuilder(config.embed.image, { name }));
        embed.setImage(`attachment://${name}`);
      } else {
        console.error(`❌ Image introuvable : ${config.embed.image}`);
      }
    }

    await channel.send({ embeds: [embed], files });

    // Rôle automatique à l'arrivée (optionnel)
    if (config.autoRoleId) {
      const role = member.guild.roles.cache.get(config.autoRoleId);
      if (role) await member.roles.add(role).catch(() => {});
    }

    // Message privé de bienvenue (optionnel)
    if (config.dm.enabled) {
      await member.send(config.dm.message.replace('{server}', member.guild.name)).catch(() => {});
    }
  } catch (err) {
    console.error('Erreur guildMemberAdd :', err);
  }
});

