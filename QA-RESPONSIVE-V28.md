# Stackly Arts Institute — Responsive QA V28

## Scope
- Audited all public HTML pages and shared header/mobile navigation.
- Audited login/signup and both dashboard pages with their dedicated styles.
- Reworked mobile/tablet responsiveness without changing the desktop design system.
- Removed the visible `Menu` label; mobile trigger is hamburger icon only.

## Responsive checks
- 360px × 800px: document horizontal overflow: 0 pages
- 390px × 844px: document horizontal overflow: 0 pages
- 430px × 932px: document horizontal overflow: 0 pages
- 768px × 1024px: document horizontal overflow: 0 pages
- Login/signup: no horizontal overflow at 360/390/430/768px
- Student/admin dashboards: no horizontal overflow at 360/390/430/768px

## Header
- Desktop navigation remains unchanged above the mobile breakpoint.
- Mobile/tablet header uses logo left + hamburger icon right.
- The trigger contains no visible `Menu` text.
- Mobile overlay contains logo left, X right, centered navigation, and bottom auth actions.
- Escape closes the menu; navigation closes the menu; resizing above the breakpoint closes it.

## Home hero
- Mobile hero reflows vertically.
- Heading width is constrained to the viewport/container.
- Desktop `hero h1` specificity was explicitly overridden so the mobile clamp actually applies.
- Hero imagery remains inside its visual composition and the document does not gain horizontal scrolling.

## File audit
- No unused CSS files.
- No unused JS files.
- `assets/images/PHOTO-SOURCES.md` was removed because it was not referenced by runtime code and was stored inside the image asset directory.
- Local HTML/CSS references were validated.
- JavaScript syntax checked with Node.

## Result
Production responsive audit completed with no document-level horizontal overflow in the tested phone/tablet widths.
