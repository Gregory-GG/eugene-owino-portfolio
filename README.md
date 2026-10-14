# Eugene Owino: Portfolio Website

The portfolio site for **Eugene Owino**, Staff Software Engineer (AI Evaluation & Fintech Systems), based in Toronto.

It is a static React site (React 18, Vite, React Router, Bootstrap 5, Tailwind with the `tw-` prefix, and Font Awesome). There is no server or database. The contact form opens the visitor's email app, and can optionally send messages through Formspree instead.

---

## 1. Run it locally

You need [Node.js](https://nodejs.org) 20.19 or newer.

```bash
npm install        # first time only
npm run dev        # start the dev server at http://localhost:5173
npm run build      # build the production site into dist/
npm run preview    # serve the built site at http://localhost:4173
```

## 2. Change contact details and settings

Everything personal lives in **`src/config/site.js`**: name, role, tagline, location, email, phone, LinkedIn, GitHub and the CV link.

- `phone`, `linkedin` and `github` are `null` because the CV has placeholders for them. Fill them in and they appear in the footer and on the Contact page automatically.
- `cvUrl` points at `public/Eugene_Owino_CV.pdf`. To update the CV, replace that file and keep the same name.
- `siteUrl`: once the site is live, set this to the full address (e.g. `https://eugeneowino.dev`) so link previews on LinkedIn, Slack and X show the image correctly.
- Any value set to `null` or an empty list (`[]`) is hidden automatically.

## 3. Content: `src/data/db.json`

All content is in `src/data/db.json`. The site reads it only through `src/api/data.js`, so it can later be swapped for a real API without changing the pages.

| Key | What it controls |
| --- | --- |
| `profile` | Summary, dissertation title and the Home page project spotlight |
| `work` | Roles and projects on the Home page, the Work page and each detail page |
| `organizations` | The "Engineering and research at" strip on the Home page |
| `impact` | The headline figures in the Home page hero |
| `expertise` | Cards on the Expertise page; the first four slugs listed in `Home.jsx` also show on Home |
| `skills` | The Core skills section on the About page |
| `education`, `certifications` | Lists on the About page |
| `testimonials` | Hidden while empty |

### Add a role or project

Copy an existing entry in `work` and change it:

```json
{
  "slug": "new-role",
  "title": "Principal Engineer, AI Platforms",
  "organization": "Example Corp",
  "location": "Toronto, ON",
  "start": "2026-11",
  "end": null,
  "category": "industry",
  "icon": "layer-group",
  "summary": "One sentence for the card.",
  "highlights": ["One bullet per achievement."],
  "tech": ["Python", "Go"],
  "featured": false,
  "featuredOrder": null
}
```

- **slug**: the page address, `/work/new-role`. Use lowercase letters and dashes.
- **start** and **end** use `YYYY-MM`. Set `end` to `null` for a current role. Leave both `null` to hide dates.
- **category** must be one of `industry`, `research`, `projects` or `contract`.
- **icon** is a Font Awesome icon name listed in `src/utils/icons.js`. Add new icons there.
- **featured**: set `true` and give it a `featuredOrder` number to show it on the Home page.

### Add a recommendation

Only add quotes the person has agreed to publish.

```json
"testimonials": [
  { "quote": "Eugene raised the bar for how we ship AI.", "name": "Jane Doe", "role": "VP Engineering, Example Corp" }
]
```

## 4. Receive messages without the visitor's email app (Formspree)

By default, the Contact form opens the visitor's email app with the message filled in. To have messages delivered straight to Eugene's inbox instead:

1. Create a free account at [formspree.io](https://formspree.io) and create a new form.
2. Copy the form ID. It is the last part of the endpoint: `https://formspree.io/f/`**`xyzabcd`**.
3. In `src/config/site.js`, set `formspreeId: 'xyzabcd'`.
4. Rebuild and redeploy.

## 5. Deploy

The site is fully static. Build it with `npm run build`, and the files to publish are in `dist/`.

### Netlify
Netlify is fully configured. `netlify.toml` sets the build command, the publish folder and Node 22. `public/_redirects` handles page links, and `public/_headers` sets caching and security headers.
- **With Git:** on [app.netlify.com](https://app.netlify.com) choose **Add new site → Import an existing project** and pick the repository. The build settings fill in automatically.
- **Drag and drop:** run `npm run build`, then drag the `dist/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

### Vercel
- **With Git:** on [vercel.com](https://vercel.com) choose **Add New → Project** and import the repository. `vercel.json` handles page links.
- **Command line:** `npx vercel` and then `npx vercel --prod`.

## 6. Custom domain

1. Buy the domain from a registrar.
2. **Netlify:** Site → Domain management → Add a domain. **Vercel:** Project → Settings → Domains → Add.
3. At your registrar, create the DNS records the host shows you.
4. HTTPS is issued automatically once DNS has updated.
5. Set `siteUrl` in `src/config/site.js` to the new address, then rebuild and redeploy.

## 7. Images, icons and motion

### Photos
All photos in `public/images/site/` are public-domain (**CC0**), found through [Openverse](https://openverse.org). CC0 needs no attribution, but the sources are listed here for reference. They are decorative stock images, not photos of Eugene or his employers' products, so they use empty alt text.

| File | Used for | Source | Creator | Licence |
| --- | --- | --- | --- | --- |
| `hero-code.webp` | Home hero background | [Software developer programming code black](https://www.rawpixel.com/image/593171/programmer-code-screen) | Markus Spiske via rawpixel | CC0 |
| `work-datacenter.webp` | Northwind role card | [Free computer server room image](https://www.rawpixel.com/image/5906639/photo-image-light-desktop-wallpapers-public-domain) | Unknown via rawpixel | CC0 |
| `work-chart.webp` | FinEval-Bench card | [Stocks Graph](https://stocksnap.io/photo/stocks-graph-MEDIALY3UV) | 50Fish via stocksnap | CC0 |
| `work-payment-terminal.webp` | Meridian Payments card | [Cranberry Isles Fishermen’s Co-op Bookkeeper](https://www.rawpixel.com/image/3259395/free-photo-image-credit-card-machine-shopping) | U.S. Department of Agriculture via rawpixel | CC0 |
| `work-laptop-code.webp` | AI evaluation contract card | [Coding Business](https://stocksnap.io/photo/coding-business-DZ1EFM9PIK) | Marc Chouinard via stocksnap | CC0 |
| `work-library.webp` | University of Toronto research card | [Library Books](https://stocksnap.io/photo/library-books-D8RFKPCP0G) | Gabriel Ghnassia via stocksnap | CC0 |
| `work-coins.webp` | Lumen Ledger Labs card | [Coins Money](https://stocksnap.io/photo/coins-money-VPSD8JT149) | Karol Dach via stocksnap | CC0 |
| `toronto-skyline.webp` | About page header | [Night skyline Toronto, Canada waterside](https://www.rawpixel.com/image/3338211/free-photo-image-canada-skyline-architecture) | Unknown via rawpixel | CC0 |
| `toronto-night.webp` | Call-to-action band | [Aerial drone shot bustling metropolis](https://www.rawpixel.com/image/3283329/free-photo-image-canada-cityscape-city-background-skyscraper) | Unknown via rawpixel | CC0 |
| `library-glass.webp` | Dissertation quote card | [Library Books](https://stocksnap.io/photo/library-books-8A670850BE) | Pavan Trikutam via stocksnap | CC0 |
| `exp-servers.webp` | Expertise: AI evaluation platforms | [Cable racks at grid computing](https://www.rawpixel.com/image/3322350/free-photo-image-server-computer-supercomputer) | U.S. Department of Energy via rawpixel | CC0 |
| `exp-code.webp` | Expertise: LLM & RAG evaluation | [Coding Programming](https://stocksnap.io/photo/coding-programming-U3W2SHOLWQ) | Ilya Pavlov via stocksnap | CC0 |
| `exp-padlocks.webp` | Expertise: red teaming & AI safety | [Free cyber security concept background](https://www.rawpixel.com/image/5910046/photo-image-background-public-domain-technology) | Unknown via rawpixel | CC0 |
| `exp-chip-cards.webp` | Expertise: fintech systems | [Free microchip photo](https://www.rawpixel.com/image/5913703/photo-image-public-domain-free) | Unknown via rawpixel | CC0 |
| `exp-fiber.webp` | Expertise: ML & data infrastructure | [Fiber Optic](https://www.rawpixel.com/image/3286376/free-photo-image-awesome-cc0-creative-commons) | Unknown via rawpixel | CC0 |
| `exp-laptop.webp` | Expertise: RLHF & human evaluation | [Macbook Computer](https://stocksnap.io/photo/macbook-computer-6UHHE19YG7) | Negative Space via stocksnap | CC0 |

To swap a photo, save a new `.webp` (about 1000–1600 px wide) into `public/images/site/` and update its path in `src/data/db.json` (`image` on work and expertise entries, or `profile.images` for the hero, About, quote and call-to-action backgrounds).

### Icons
- **Font Awesome** (solid and brands) for interface icons.
- **[Simple Icons](https://simpleicons.org)** (CC0) for technology and certification logos, mapped by name in `src/utils/techIcons.js`. Add a logo by importing it there and adding a line to `MAP`. The scrolling logo strip on the Home page is the `MARQUEE` list in the same file.

### Motion
- Sections fade up as they scroll into view: add the `reveal` class to any element. A `--reveal-delay` style staggers items.
- Headline figures count up, the hero cycles through focus areas, and the logo strip scrolls (it pauses on hover).
- Cards lift, zoom their photo and show a cursor-following glow on hover.
- Visitors who turn on "reduce motion" in their system settings get a still page with everything visible.

### Theme
Dark mode is always the default. Visitors can switch to light with the sun/moon button; their choice is remembered.

---

### Project layout

```
public/            favicon, social image, CV PDF, images/site/ photos, _redirects, _headers
src/api/data.js    data access layer (the only file that reads db.json)
src/components/    NavBar, Footer, WorkCard, ExpertiseCard, TechIcon, TechMarquee, ...
src/config/site.js contact details and settings
src/data/db.json   work, expertise, skills, education, certifications
src/hooks/         useTheme, useReveal (scroll animations), useCountUp, useSpotlight
src/pages/         Home, Work, WorkDetail, About, Expertise, Contact, NotFound
src/styles/        variables.css (theme colours), global.css, components.css
src/utils/         contact links, date formatting, icons
```
