# Breathe

Application de respiration guidée avec 4 ambiances visuelles et sonores (Dawn, Forest, Ocean, Dusk).

---

## 1. Prérequis

- **Node.js** (v18+) : [nodejs.org](https://nodejs.org/)
- **Python 3** : requis par le skill `ui-ux-pro-max`
- **Claude Code** : [claude.ai/code](https://claude.ai/code)

---

## 2. Installation du projet

```bash
git clone <url-du-repo>
cd portfolio
npm install
```

---

## 3. Lancer l'application

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

---

## 4. Configurer les outils IA (Claude Code)

Le projet utilise des **skills** et des **serveurs MCP** pour Claude Code.
Les skills sont inclus dans le repo, mais les serveurs MCP nécessitent des clés API personnelles.

### Skills (inclus dans le repo, rien a faire)

| Skill | Description |
|-------|-------------|
| `nano-banana-2` | Génération d'images via Google Gemini (inference.sh) |
| `ui-ux-pro-max` | Base de données de design UI/UX (styles, palettes, fonts, guidelines) |

### Serveurs MCP (a configurer avec tes propres clés)

Le fichier `.claude/skills/.mcp.json` est **gitignored** car il contient des clés API.
Il faut le créer manuellement avec tes propres clés :

```bash
# 1. Magic (21st.dev) — génération de composants UI React
#    Obtenir une clé sur : https://21st.dev/magic/console
claude mcp add magic --scope project --env API_KEY="TA_CLE_21ST_DEV" -- npx -y @21st-dev/magic@latest

# 2. Stitch (Google) — prototypage UI avec Gemini
#    Obtenir une clé sur : https://stitch.withgoogle.com
claude mcp add stitch --transport http --scope project --header "X-Goog-Api-Key: TA_CLE_GOOGLE" -- https://stitch.googleapis.com/mcp
```

### Nano Banana 2 (optionnel, payant)

Pour utiliser la génération d'images :

```bash
# Installer le CLI inference.sh
curl -fsSL https://cli.inference.sh | sh

# Se connecter avec ta clé (obtenir sur https://app.inference.sh)
infsh login --key TA_CLE_INFSH
```

---

## 5. Déploiement

```bash
npm run build
```

Le dossier `out/` contient le site statique prêt à déployer sur Vercel, Netlify, ou tout hébergeur statique.

---

## 6. Documentation technique

Voir [PROJECT.md](./PROJECT.md) pour la structure détaillée du code et comment modifier les contenus (textes, couleurs, images).

---

## 7. Fichiers non inclus dans le repo (gitignored)

Ces fichiers ne sont **pas pushés** sur GitHub. Il faut les recréer ou se les faire envoyer :

| Fichier | Contenu | Comment le recréer |
|---------|---------|-------------------|
| `.claude/skills/.mcp.json` | Config des serveurs MCP (magic + stitch) avec clés API | Lancer les commandes `claude mcp add` de la section 4 |
| `node_modules/` | Dépendances Node.js | `npm install` |
| `.next/` | Cache de build Next.js | `npm run dev` ou `npm run build` |
| `out/` | Site statique exporté | `npm run build` |

## 8. Checklist pour un nouveau collègue

### Ce qu'il doit installer lui-même
- [ ] Node.js (v18+)
- [ ] Python 3
- [ ] Claude Code
- [ ] CLI inference.sh : `curl -fsSL https://cli.inference.sh | sh` (optionnel)

### Ce que tu dois lui envoyer (en privé, jamais sur GitHub)
- [ ] Clé API **21st.dev** (magic) — ou il crée la sienne sur [21st.dev/magic/console](https://21st.dev/magic/console)
- [ ] Clé API **Google** (stitch) — ou il crée la sienne sur [stitch.withgoogle.com](https://stitch.withgoogle.com)
- [ ] Clé API **inference.sh** (nano-banana-2, optionnel) — ou il crée la sienne sur [app.inference.sh](https://app.inference.sh)

### Ce qu'il doit lancer après avoir reçu les clés
```bash
# 1. Cloner et installer
git clone <url-du-repo>
cd portfolio
npm install

# 2. Configurer les MCP avec les clés reçues
claude mcp add magic --scope project --env API_KEY="CLE_RECUE" -- npx -y @21st-dev/magic@latest
claude mcp add stitch --transport http --scope project --header "X-Goog-Api-Key: CLE_RECUE" -- https://stitch.googleapis.com/mcp

# 3. (Optionnel) Configurer inference.sh
curl -fsSL https://cli.inference.sh | sh
infsh login --key CLE_RECUE

# 4. Lancer
npm run dev
```
