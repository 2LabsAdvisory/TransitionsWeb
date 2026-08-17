# Transitions — Static Website

A complete static build of the new transitions-ab.org, generated from the project's
sitemap (IA), wireframes, content guide and brand guide.

## Structure
- index.html ............... Home
- programs.html ........... Programs & Services (overview)
- family-services.html .... Program/Service page (template — Family Services filled in)
- donate.html ............. Ways to Give / Donate
- our-impact.html ......... Our Impact
- our-story.html .......... Our Story (About)
- resources.html .......... Resources & Funding Guides
- careers.html ............ Careers
- contact.html ............ Contact
- 404.html ................ Not-found page (configure your host to serve it)
- robots.txt, sitemap.xml . Crawler directives
- styles.css .............. Shared stylesheet (design tokens, components, responsive @media)
- script.js ............... Mobile menu, donation pickers, unwired-form notices
- assets/logo.png, emblem.png ... Logo + emblem (emblem also the favicon)
- assets/photo1..7.jpg .... Photography

## How to view
Open index.html in any browser, or serve the folder:
`python3 -m http.server`  then visit http://localhost:8000

No build step, framework or server-side code — pure HTML/CSS/JS.

## Editing conventions

**The header, mobile menu and footer are duplicated in all 10 HTML files.** There is no
include mechanism, so any change to a phone number, address, charity number or nav item
must be repeated in every file. Change one, change all ten — then re-run the link check
below. If this becomes painful, that is the signal to add a small build step.

**Accessibility is a product requirement here, not a nice-to-have.** When adding markup:
- every `<img>` needs an `alt` (empty `alt=""` only if genuinely decorative);
- every form control needs a `<label for="…">` pointing at its `id`;
- anything clickable must be an `<a href>` or a `<button>` — never a click handler on a
  `<div>` or `<span>`, which keyboard and screen-reader users cannot reach;
- cards are made clickable by wrapping the card's `<h3>` text in a link; `.card h3>a::after`
  stretches that link over the whole card, so the card stays a single tab stop.

Quick check before committing:

```bash
grep -o '<img[^>]*>' *.html | grep -v 'alt=' ; grep -o '<a\( [^>]*\)\?>' *.html | grep -v 'href='
```

## Forms are not wired up

None of the forms have a back end. Each is marked `data-unwired`, and script.js intercepts
the submit to tell the visitor plainly that nothing was sent and to call (780) 458-7371
instead. **Remove the `data-unwired` attribute as you connect each handler** — otherwise a
working form will keep showing the "not connected" notice.

Donation card details are deliberately *not* collected by this site. `donate.html` has a
`.cardslot` placeholder where the CanadaHelps embed goes; keep payment fields inside their
iframe so card data never touches this codebase.

## Before you go live — replace the remaining placeholders
- Statistics (e.g. "300+ families", "92¢ of every $", the Our Impact numbers)
- Per-gift impact lines on Donate ("$50 funds a week of sessions") — confirm against program costs
- Registered charity number (#XXXXX) — appears in the footer of all 10 pages and on Donate
- Real family stories + the annual report PDF (and the program-allocation chart).
  "Request the annual report" currently points at the contact page.
- Wire the Donate form to your CanadaHelps embed; wire the contact/inquiry/careers/search
  forms to a handler, then drop their `data-unwired` attributes
- Write the FSCD/PDD/AISH guides and the resource library. The three funding cards on
  resources.html say "Read the … guide →" but have nowhere to link yet, and the four
  library cards are placeholder "Resource title" entries.
- Accessibility and Privacy pages. These are currently plain text in the footer rather than
  links, because linking to a page that does not exist is worse than not linking.
- The header "Sign In" link is a stub (`href="#"`) for a future portal — wire or remove it.
- Photography: the images in assets/ are low resolution (~398×297) and read as generic
  stock rather than Transitions programs — a subway car, a park chess game, a stack of
  picture books. Replace them with real, high-resolution photos of your own programs, with
  consent, and update each `alt` to describe the new image.
- Set the real domain. Canonical tags, `og:url`, sitemap.xml and robots.txt all assume
  `https://www.transitions-ab.org/`; find and replace if the site lands elsewhere.
- Fonts load from Google Fonts (Poppins); self-host for a fully offline build.
