# Khadija EL AZIZI — Portfolio

Static portfolio website (HTML + CSS, no build step) for Khadija EL AZIZI, SEO Specialist & Web Designer.

## Pages
| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About me / experience |
| `websites.html` | Web design case studies (9 sites, tabbed) |
| `seo.html` | SEO case studies (9 clients, tabbed) |
| `contact.html` | Contact |

All images are in `assets/img/`. Fonts load from Google Fonts (Geist, Geist Mono).

## Run locally
Open `index.html` in a browser, or serve the folder:
```
python3 -m http.server 8000
```
then visit http://localhost:8000 (the hero "sheen" animation needs a server, not `file://`).

## Deploy
Designed for GitHub Pages (root of the `main` branch). `.nojekyll` is included.
Replace `SITE_URL` in `robots.txt` and `sitemap.xml` with the final site address.
