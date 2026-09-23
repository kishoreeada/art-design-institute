# Stackly Arts Institute — V30 CTA / 404 / Arrow QA

## 1. Arrow cleanup
- Removed decorative arrow characters from all HTML pages.
- CTA labels no longer contain text arrows.
- Existing meaningful visual affordances use Font Awesome icons where appropriate.
- Removed unnecessary arrow characters rather than leaving empty/duplicate arrow text.

## 2. 404 redesign
The 404 page was rebuilt as a dedicated, minimal error screen:
- Main heading: `404`
- Supporting heading: `404 NOT FOUND`
- Centered composition
- No header/footer
- No page scrolling
- Full viewport at phone, tablet and desktop sizes
- `GO TO HOME` navigates to `index.html`
- `PREVIOUS PAGE` calls browser history back
- If no previous history exists, `PREVIOUS PAGE` falls back to `index.html`
- Both buttons have hover/focus/active states

## 3. CTA routing
Action/CTA links were audited and routed to `404.html`, while preserving:
- Primary site navigation
- Mobile navigation
- Footer navigation
- Login/signup authentication flow
- Form submit controls

The special non-form `See practice in action` button also routes to `404.html`.

## 4. 404 viewport audit
Checked:
- 360 × 800
- 390 × 844
- 768 × 1024
- 1440 × 900

All four passed:
- scrollWidth = viewport width
- scrollHeight = viewport height
- body overflow = hidden
- centered title
- both required controls present
