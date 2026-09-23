# Stackly Arts Institute — V31 Tablet / Responsive Menu QA

## Problem identified
At tablet widths, especially `768 × 491`, opening the hamburger could expose a partially translated mobile menu during its slide animation. This made the large logo/navigation/action labels appear clipped or oversized.

## Fix
The shared responsive CSS was hardened for `<=900px`:
- Hamburger remains icon-only.
- Desktop nav, Sign Up and Login header buttons are hidden.
- Mobile menu is a true `100vw × 100dvh` fixed overlay.
- Mobile menu has its own isolated typography and sizing.
- Menu logo is constrained to 140px on short tablet viewports and 160px otherwise.
- Close button remains top-right.
- Navigation is centered.
- Sign Up/Login actions remain at the bottom.
- On short tablet heights (`<=600px`), nav gaps and type sizes are reduced so all five links and both actions fit.
- Removed the menu slide transform/opacity delay at tablet/mobile widths so there is no half-open state when clicked.
- Body scrolling is locked while the menu is open.
- Closing the menu restores `aria-expanded="false"` and normal page interaction.

## Browser QA
Tested the shared menu behavior on:
- 768 × 491
- 768 × 1024
- 600 × 800
- 390 × 844
- 375 × 667

All tested public pages:
- about.html
- admissions.html
- blog.html
- contact.html
- events.html
- faculty.html
- gallery.html
- index.html
- program-detail.html
- programs.html
- services.html
- student-life.html

For every tested page:
- `scrollWidth == viewport width`
- hamburger exists
- desktop navigation is hidden at tablet/mobile widths
- opening menu produces `x=0, y=0, width=viewport, height=viewport`
- menu is visible immediately
- closing menu works
- `aria-expanded` returns to `false`
- body overflow is locked while open

Desktop sanity:
- At 1024px and 1440px the desktop navigation remains active and hamburger is hidden.
