# Bot de bienvenue Discord

## Installation
1. `npm install`
2. Renomme `.env.example` en `.env` et remplis TOKEN + WELCOME_CHANNEL
3. Active **SERVER MEMBERS INTENT** dans le Developer Portal (onglet Bot)
4. `npm start`

## Personnalisation
Tout se règle dans `config.json` — aucun code à toucher.

- `presence.status` : online, idle, dnd, invisible
- `presence.type` : Playing, Watching, Listening, Competing
- `embed.image` : URL de la grande bannière dans le message (laisse vide pour ne rien afficher)
- `embed.description` : variables `{user}`, `{count}`, `{created}`
- `autoRoleId` : ID d'un rôle donné automatiquement (laisse vide pour désactiver)
- `dm.enabled` / `leave.enabled` : true pour activer

## Avatar / bannière du bot
Mets `avatar.png` et `banner.png` dans le dossier, puis `node setup-images.js`.
(Ou plus simplement via le Developer Portal.)

## En ligne 24/7
Sur un VPS : `npm i -g pm2` puis `pm2 start index.js --name bot && pm2 save`
