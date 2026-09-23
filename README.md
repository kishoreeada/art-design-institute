# Stackly Arts Institute — Production Website

## Structure

```text
stackly-auth-v27/
├── 404.html
├── index.html
├── about.html
├── blog.html
├── services.html
├── contact.html
├── admissions.html
├── programs.html
├── program-detail.html
├── events.html
├── gallery.html
├── faculty.html
├── student-life.html
├── login.html
├── signup.html
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── auth.css
│   │   ├── application-responsive-fix-v21.css
│   │   └── dashboard.css
│   ├── images/
│   └── js/
│       ├── main.js
│       ├── animations.js
│       ├── auth.js
│       └── dashboard.js
└── dashboards/
    ├── student/
    │   └── index.html
    └── admin/
        └── index.html
```

## Dashboard

Both dashboards use five in-page tabs so there are no redundant dashboard sub-page files:

- Student: Overview, My Courses, Schedule, Assignments, Studio Work
- Admin: Overview, Students, Programs, Reviews, Studio Calendar

The dashboard navigation is handled by `assets/js/dashboard.js`.

## Production rules

- Local assets only.
- Shared home-page Stackly logo asset is used consistently.
- Flexbox layout; no CSS Grid added.
- Responsive behavior includes mobile sidebar navigation.
- Reduced-motion support is retained.
- Authentication and dashboard scripts remain separate from public-site scripts.

## Cleanup

Development/test pages, historical QA notes, obsolete dashboard sub-pages, and unreferenced legacy image assets were removed from the production package.


## V26 audit

- HTML local links: PASS
- CSS asset paths: PASS
- Unreferenced runtime images: PASS
- Exact duplicate images: PASS
- Student dashboard: 5 tabs / matching views / logout: PASS
- Admin dashboard: 5 tabs / matching views / logout: PASS
