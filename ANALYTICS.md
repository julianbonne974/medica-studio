# Analytics Configuration

Ce projet utilise **Plausible Analytics**, une solution d'analyse web respectueuse de la vie privée et conforme au RGPD.

## Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=votre-domaine.com
```

### 2. Configurer Plausible

1. Créez un compte sur [plausible.io](https://plausible.io)
2. Ajoutez votre site web dans le dashboard Plausible
3. Utilisez le même domaine que dans `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`

### 3. Goals personnalisés (optionnel)

Pour tracker les événements personnalisés, configurez les goals suivants dans votre dashboard Plausible :

- **Project View** - Quand un utilisateur visite une page projet
- **Project Click** - Quand un utilisateur clique sur une carte projet
- **Contact Form Submit** - Quand le formulaire de contact est soumis
- **Filter Change** - Quand un utilisateur change de filtre de projets

## Événements trackés

### Automatiques
- **Page views** - Toutes les visites de pages (automatique)

### Personnalisés
- **Project View** - Vue d'une page projet détaillée
  - Props: `title`, `slug`
- **Project Click** - Clic sur une carte projet depuis la page d'accueil
  - Props: `title`, `slug`
- **Contact Form Submit** - Soumission du formulaire de contact
- **Filter Change** - Changement de filtre de catégorie
  - Props: `filter`

## Utilisation

L'analytics est automatiquement activé en production. Pour le tester en local :

1. Assurez-vous que `.env.local` contient `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
2. Lancez le serveur de développement
3. Les événements seront envoyés à Plausible

## Ajouter de nouveaux événements

Utilisez la fonction `trackEvent` depuis `lib/analytics.ts` :

```typescript
import { analytics } from "@/lib/analytics";

// Track un événement simple
analytics.contactFormSubmit();

// Track un événement avec des propriétés
analytics.projectClick("Titre du projet", "slug-du-projet");

// Ou créez votre propre événement
import { trackEvent } from "@/lib/analytics";
trackEvent("Custom Event", { customProp: "value" });
```

## Avantages de Plausible

- ✅ Conforme RGPD, pas besoin de cookie banner
- ✅ Léger (~1KB vs 45KB pour Google Analytics)
- ✅ Open source
- ✅ Respectueux de la vie privée
- ✅ Dashboard simple et clair
- ✅ Pas de cookies
