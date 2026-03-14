# Breathe App

## Vue d'ensemble

Application web de respiration guidée avec 4 ambiances visuelles et sonores.
Construite avec Next.js et React, sans dépendances externes (pas de Tailwind, pas de UI library).

## Structure du projet

```
breathe-app/
├── app/
│   ├── layout.tsx          # Layout racine (polices, metadata)
│   └── page.tsx            # Page principale — orchestre tous les composants
├── components/
│   ├── SceneThemes.ts      # Données : scènes, patterns de respiration, citations
│   ├── AudioEngine.ts      # Son ambiant généré (Web Audio API, pas de fichiers audio)
│   ├── WaveCanvas.tsx       # Animation des ondes concentriques (canvas)
│   ├── HeroSection.tsx      # Section d'accueil avec titre et CTA
│   ├── BreatheSection.tsx   # Orbe de respiration + timer + guide
│   ├── JourneySection.tsx   # Sélecteur de scène (Dawn, Forest, Ocean, Dusk)
│   ├── CloseSection.tsx     # Citations inspirantes
│   ├── Nav.tsx              # Barre de navigation + points de progression
│   └── Footer.tsx           # Pied de page
├── public/
│   └── images/
│       ├── dawn.png        # Image décorative (section hero)
│       └── dandelion.png    # Image de réserve
├── styles/
│   └── globals.css          # Tous les styles CSS
├── next.config.ts           # Config Next.js (export statique activé)
├── package.json
└── tsconfig.json
```

## Les 4 scènes

| Scène   | Pattern respiration | Ambiance sonore       |
|---------|--------------------|-----------------------|
| Dawn    | 4-4-6-2 (Box)      | Tons sinusoïdaux doux |
| Forest  | 4-7-8              | Bruit filtré (pluie)  |
| Ocean   | 5-0-5 (Wave)       | Bruit LFO (vagues)    |
| Dusk    | 4-4-8 (Golden)     | Drone profond         |

## Modifier les contenus

- **Citations** : fichier `components/SceneThemes.ts`, tableau `quotes`
- **Patterns de respiration** : fichier `components/SceneThemes.ts`, objet `sceneThemes`
- **Textes des cartes** : fichier `components/SceneThemes.ts`, tableau `journeyCards`
- **Couleurs** : fichier `styles/globals.css`, variables CSS dans `:root`
- **Images** : remplacer les fichiers dans `public/images/`

## Commandes

```bash
npm run dev     # Lancer en mode développement (http://localhost:3000)
npm run build   # Construire pour la production
npm run start   # Lancer la version de production
```
