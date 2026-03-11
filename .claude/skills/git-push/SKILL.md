---
name: git-push
description: "Push le code sur GitHub. Ajoute les fichiers, crée un commit avec un message clair, et push sur le repo distant. Triggers: push, deploy, envoie sur github, git push, pousse le code, mets sur github, publie"
---

# Git Push — Envoyer le code sur GitHub

## Workflow

Quand l'utilisateur demande de push sur GitHub, suivre ces étapes dans l'ordre :

### 1. Vérifier l'état du repo

```bash
git status
```

S'il n'y a aucun changement, informer l'utilisateur et s'arrêter.

### 2. Montrer les changements

Afficher un résumé clair des fichiers modifiés/ajoutés/supprimés à l'utilisateur.

### 3. Demander confirmation

Avant de commit, demander à l'utilisateur :
- S'il veut tout inclure ou seulement certains fichiers
- Proposer un message de commit clair et concis (en français)
- Attendre sa validation

### 4. Ajouter, commit et push

```bash
git add <fichiers>
git commit -m "message validé par l'utilisateur"
git push origin main
```

### 5. Confirmer

Afficher le lien du repo GitHub et confirmer que le push est fait.

## Règles

- **Ne jamais push sans demander confirmation à l'utilisateur**
- **Ne jamais inclure de fichiers sensibles** (.env, clés API, .mcp.json)
- **Vérifier le .gitignore** avant de push
- **Message de commit en français**, court et descriptif
- **Ne pas utiliser** `git add .` ou `git add --all` sans vérifier d'abord ce qui sera ajouté
- **Ne pas utiliser** `--force` sauf si l'utilisateur le demande explicitement
