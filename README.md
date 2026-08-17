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
- assets/*.jpg ............ Photography (see below)

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

## Content sourced from the live site

Facts, links and photography were taken from the live transitions-ab.org (and, for the
charity number, the CRA registration) rather than invented:

- Registered charity **119162048RR0001**, legal name *Transitions Rehabilitation
  Association of St. Albert and District* — in every footer and in the homepage JSON-LD.
- Donate embeds the Donors by 2Labs form (`donors.2labs.ca/f/donation-form`), which fronts
  CanadaHelps. Card details never touch this site. **The embed currently renders branded
  "2Labs Advisory" with charity number `12345 6789 RR0001` — it needs to be pointed at the
  Transitions tenant before launch.** The organisation's own CanadaHelps page is
  canadahelps.org/dn/14896 if a direct link is ever needed instead.
- Amazon Wish List, Facebook, Instagram, LinkedIn and the membership login all point at the
  organisation's real URLs.
- FSCD/PDD/AISH cards link to the matching alberta.ca pages; the FSCD intake number
  (780) 427-4354 option 3 is included.
- Programme eligibility and service lists (birth–6 with delays in two or more areas; FSCD
  respite in three-hour minimum shifts; 24/7 or 5–40 hrs of adult support) match the live
  programme pages. Careers uses the real posting titles.

Photography now comes from the organisation's own media library, resized and re-encoded
for the web (~980 KB total, down from unusable ~398×297 crops). The strongest image —
two people laughing together, on the homepage hero — is genuine programme photography.

## Before you go live — remaining placeholders
- **Point the donation embed at the Transitions tenant.** As deployed it shows "2Labs
  Advisory / Support our work" and a placeholder charity number, so donors on the
  Transitions donate page currently see the wrong organisation.
- **Our Impact needs real numbers.** The figures that were on that page ("312 people",
  "1,200+ respite hours", "92¢ of every $") were invented and have been replaced with
  verifiable facts. Put the audited annual-report figures back in, plus the programme
  allocation chart and the report PDF itself — "Request the annual report" currently
  points at the contact page.
- **Per-gift impact lines on Donate** were removed for the same reason. Restore them as
  "$75 funds …" once programme costs are confirmed.
- Real family stories for the homepage and Our Impact.
- Wire the contact/inquiry/careers/search forms to a handler, then drop their
  `data-unwired` attributes.
- Write the FSCD/PDD/AISH guides and the resource library — resources.html currently says
  the library is under construction, matching the live site.
- Accessibility and Privacy pages. These are plain text in the footer rather than links,
  because linking to a page that does not exist is worse than not linking.
- Check the Early Childhood age range. This site and the live programme page say birth to
  6; the CanadaHelps description says "up to 3½ years old". One of them is wrong.
- Set the real domain. Canonical tags, `og:url`, sitemap.xml and robots.txt all assume
  `https://www.transitions-ab.org/`; find and replace if the site lands elsewhere.
- Fonts load from Google Fonts (Poppins); self-host for a fully offline build.
- Confirm photo consent. The homepage hero shows identifiable people; it is republished
  from the organisation's own site, but check the release covers this use.
