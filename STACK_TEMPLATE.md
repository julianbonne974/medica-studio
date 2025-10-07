# 🎯 PROMPT VANILLA - Site Portfolio/Vitrine avec Next.js + Decap CMS

Je veux créer un site web moderne et performant avec la stack suivante :

## 🛠️ Stack Technique

### Core
- **Next.js 15.5.4** avec App Router
- **TypeScript** strict mode
- **React 19**

### Styling & UI
- **Tailwind CSS v4** (@tailwindcss/postcss)
- **shadcn/ui** components : Badge, Button, Card, Input, Textarea, Separator
- **Framer Motion** pour animations fluides
- **Lucide React** pour les icônes
- **next-themes** pour dark mode
- **tw-animate-css** pour animations CSS

### CMS & Content
- **Decap CMS** (Netlify CMS) pour gestion du contenu
- **gray-matter** pour parser le frontmatter Markdown
- Structure de contenu dans `/content/` avec collections multiples
- **Git Gateway** pour authentification Decap

### Deployment & Features
- **Netlify** avec @netlify/plugin-nextjs v5
- **Netlify Forms** pour formulaires de contact
- **Plausible Analytics** (optionnel)
- **next-nprogress-bar** pour loading states
- SEO optimisé avec metadata

---

## 📁 Architecture du Projet

```
/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout principal avec providers
│   ├── page.tsx             # Homepage
│   ├── about/               # Page À propos
│   ├── contact/             # Formulaire de contact
│   └── [collection]/        # Pages dynamiques par collection
│       ├── page.tsx         # Liste des items
│       └── [slug]/          # Page détail d'un item
│           └── page.tsx
│
├── components/              # Composants React
│   ├── ui/                  # shadcn/ui components
│   ├── [feature]/           # Composants par feature
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   └── project/             # Composants spécifiques aux projets
│       ├── shared/          # Composants partagés
│       └── [template]/      # Composants par template
│
├── lib/                     # Utilitaires & helpers
│   ├── [collection].ts      # CRUD pour collections
│   ├── analytics.ts         # Analytics client
│   └── utils.ts             # Helpers généraux
│
├── types/                   # Types TypeScript
│   └── [collection].ts      # Types par collection
│
├── content/                 # Contenu Markdown
│   └── [collection]/        # Collections (ex: projects, blog)
│       ├── [category]/      # Sous-catégories
│       └── *.md            # Fichiers Markdown
│
├── public/
│   ├── admin/              # Decap CMS config
│   │   ├── index.html      # Page admin CMS
│   │   └── config.yml      # Configuration collections
│   ├── images/             # Assets statiques
│   └── __forms.html        # Formulaire statique pour Netlify Forms
│
├── netlify.toml            # Config Netlify
├── next.config.ts          # Config Next.js
├── tailwind.config.ts      # Config Tailwind
└── tsconfig.json           # Config TypeScript
```

---

## 🎨 Design System & Branding

### Palette de couleurs
- **Primary** : Émeraude/Vert (#059669, #10B981)
- **Neutral** : Zinc (50 → 950)
- **Accent** : À définir selon le client
- **Background** : white / zinc-950 (dark mode)

### Typography
- **Headings** : font-bold, tracking-tight
- **Body** : text-zinc-600 (light) / text-zinc-400 (dark)
- **Sizes** : Responsive (text-4xl sm:text-6xl md:text-7xl)

### Components Style
- **Cards** : Border subtle, hover effects avec translate-y
- **Buttons** : Border-2, transitions fluides
- **Rounded** : rounded-none ou rounded-xl (pas de rounded-md)
- **Shadows** : shadow-none par défaut, shadow-lg au hover

---

## 🗂️ Système de Collections (Decap CMS)

### Collection Type 1 : "Projects/Portfolio"
**Champs** :
- `template` : hidden, default value
- `title` : string
- `slug` : string
- `description` : text (courte)
- `longDescription` : markdown
- `image` : image (optional)
- `mobileImage` : image (optional)
- `order` : number (pour tri)
- `status` : select (draft/published)
- `metadata` : object (year, team, client, duration)
- `technologies` : list
- `features` : list of objects (title, description)
- `gallery` : list of images
- `links` : object (demo, github, website)

### Collection Type 2 : "Blog/Articles"
**Champs** :
- `title`, `slug`, `date`, `author`
- `excerpt`, `content` (markdown)
- `image`, `category`, `tags`
- `status` : draft/published

---

## ⚙️ Fonctionnalités Clés

### 1. Tri & Filtrage Intelligent
```typescript
// Tri multi-niveaux : template → order → alphabétique
export function getSortedItems() {
  return items
    .filter(p => p.status === "published")
    .sort((a, b) => {
      // 1. Par template/catégorie
      const templateDiff = templateOrder[a.template] - templateOrder[b.template];
      if (templateDiff !== 0) return templateDiff;

      // 2. Par ordre d'affichage
      if (a.order !== b.order) return a.order - b.order;

      // 3. Alphabétique
      return a.title.localeCompare(b.title);
    });
}
```

### 2. Formulaire de Contact (Netlify Forms v5)
- Fichier statique `/public/__forms.html` pour détection
- Soumission AJAX vers `/__forms.html`
- Gestion d'erreurs + états de succès avec Framer Motion
- Honeypot pour anti-spam

### 3. Images Desktop/Mobile avec Toggle
```typescript
const hasBothImages = item.image && item.mobileImage;
const currentImage = showMobile ? item.mobileImage : item.image;
// Toggle button uniquement si les deux images existent
```

### 4. Dark Mode Persistant
- next-themes avec localStorage
- Classes Tailwind `dark:`
- Toggle dans navigation avec icône sun/moon

### 5. Animations Fluides
- Framer Motion pour page transitions
- Scroll-triggered animations avec `whileInView`
- Stagger animations pour listes
- AnimatePresence pour entrées/sorties

---

## 🚀 Configuration Netlify

### netlify.toml
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Decap CMS Backend
```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "public/images/[collection]"
public_folder: "/images/[collection]"
```

---

## 📝 Instructions de Création

### Phase 1 : Setup Initial
1. Créer le projet Next.js 15 avec TypeScript
2. Installer toutes les dépendances listées
3. Configurer Tailwind CSS v4
4. Installer shadcn/ui components (Badge, Button, Card, Input, Textarea, Separator)
5. Setup next-themes pour dark mode
6. Créer l'architecture de dossiers

### Phase 2 : Design System
1. Définir la palette de couleurs (adapter selon le client)
2. Créer le système de typography
3. Configurer les variants de components
4. Setup Framer Motion animations

### Phase 3 : Collections & CMS
1. Créer les types TypeScript pour chaque collection
2. Créer les fichiers Markdown d'exemple dans `/content/`
3. Développer les fonctions CRUD dans `/lib/`
4. Configurer Decap CMS (`/public/admin/config.yml`)
5. Tester la création/édition de contenu

### Phase 4 : Pages & Components
1. Layout principal avec navigation et footer
2. Homepage avec hero section
3. Pages de listing (avec filtres)
4. Pages détail pour chaque item
5. Page de contact avec formulaire Netlify Forms
6. Page About

### Phase 5 : Features Avancées
1. Système de tri intelligent (template → order → alphabétique)
2. Filtres par catégorie avec animations
3. Galeries d'images avec lightbox
4. SEO metadata dynamique
5. Analytics (Plausible)

### Phase 6 : Déploiement
1. Créer repo GitHub
2. Connecter à Netlify
3. Configurer variables d'environnement
4. Activer Netlify Forms et Git Gateway
5. Tester le CMS en production
6. Configurer le domaine custom

---

## ✅ Checklist Qualité

- [ ] Build réussit sans erreurs TypeScript
- [ ] Dark mode fonctionne parfaitement
- [ ] Responsive sur mobile/tablet/desktop
- [ ] Formulaire de contact envoie les emails
- [ ] Decap CMS accessible et fonctionnel
- [ ] Images optimisées (Next.js Image)
- [ ] SEO metadata sur toutes les pages
- [ ] Lighthouse score > 90 (Performance, Accessibility, SEO)
- [ ] Animations fluides sans lag
- [ ] Tri des collections fonctionne correctement

---

## 🎯 Personnalisation par Client

### Variables à adapter :
1. **Branding** : Couleurs, fonts, logo
2. **Collections** : Types de contenu (projets, blog, services, équipe)
3. **Templates** : Layouts de pages détail selon les collections
4. **Features** : Filtres, recherche, pagination selon besoins
5. **Integrations** : CRM, Newsletter, Analytics

### Points d'attention :
- Toujours utiliser le système de tri multi-niveaux pour éviter les conflits d'ordre
- Images desktop/mobile optionnelles mais au moins une requise
- Netlify Forms v5 nécessite le fichier statique `__forms.html`
- Decap CMS nécessite Git Gateway configuré dans Netlify

---

## 🔧 Code Snippets Réutilisables

### Fonction de tri intelligente
```typescript
export function getSortedProjects(): Project[] {
  try {
    const allProjects = getAllProjects();
    return allProjects
      .filter((p) => p.status === "published")
      .sort((a, b) => {
        // 1. Tri par template : applications d'abord, puis technologies
        const templateOrder: Record<string, number> = {
          application: 1,
          technology: 2,
          research: 3,
        };
        const templateDiff = (templateOrder[a.template] || 999) - (templateOrder[b.template] || 999);
        if (templateDiff !== 0) return templateDiff;

        // 2. Tri par ordre d'affichage
        if (a.order !== b.order) return a.order - b.order;

        // 3. Si même ordre, tri alphabétique par titre
        return a.title.localeCompare(b.title);
      });
  } catch (error) {
    console.error("Erreur lors du tri des projets:", error);
    return [];
  }
}
```

### Formulaire de contact avec Netlify Forms v5
```typescript
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);

  try {
    // Next.js Runtime v5 requires submission to static HTML file
    const response = await fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    });

    if (!response.ok) throw new Error('Erreur lors de la soumission');

    setSubmitted(true);
  } catch (error) {
    console.error("Error:", error);
    alert("Une erreur s'est produite. Veuillez réessayer.");
  }
};
```

### Animation de carte avec Framer Motion
```typescript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
  className="group h-full"
>
  {/* Card content */}
</motion.div>
```

---

**Note** : Ce template est basé sur l'architecture réussie du projet Medica Studio (https://medicastudio.fr). Tous les patterns et configurations ont été testés et validés en production sur Netlify.

**Auteur** : Julian Bonne - Medica Studio
**Date de création** : Octobre 2025
**Version** : 1.0
