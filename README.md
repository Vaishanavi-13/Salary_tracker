# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## MSRTC Theme & Styling

The application is styled to reflect the Maharashtra State Transport identity:

- **Colors**: custom Tailwind palette under `msrtc` (red, blue, gold, light gray).
- **Font**: `Poppins` imported globally.
- **Logo**: place `msrtc-logo.svg` in `public/` or replace the placeholder.
- **Cursor**: special SVG cursor can be set as described below.

To update or extend the theme:

1. Edit `tailwind.config.js` to adjust colors or fonts.
2. Modify `src/index.css` for additional base styles (e.g. dark mode, typography).
3. Replace the logo and cursor files in `public/` with production assets.

### Sheet defaults

When a user signs up they enter their **division** and **depot**. These values are:

- saved with the user record,
- used to prefill new salary sheets for that user,
- shown on the sheet header as read‑only fields so they cannot be changed once created.

This guarantees each TTO sees the correct division/depot on every sheet without accidentally editing them.

---

## Custom Cursor

To use a unique cursor on the site:

1. Add a cursor graphic to the `public/` folder. For a Maharashtra State Transport theme, SVG works best – design a small bus icon, logo, or similar and save it as `public/cursor.svg`.
   *You can also embed the SVG directly in CSS (see below).* 
2. The global stylesheet (`src/index.css`) now contains the rule:
   ```css
   /* custom cursor – themed for Maharashtra State Transport */
   body, * {
     cursor: url('/cursor.svg') 0 0, auto;
   }
   ```
   - Adjust the hotspot coordinates (`0 0` above) to position the "click point" correctly for your icon.
   - If you prefer a data URI, uncomment and modify the alternate example in `index.css`.
3. Restart the dev server (`npm run dev` or `yarn dev`) and the themed cursor will appear throughout the site.

```html
<!-- example SVG file in public/cursor.svg -->
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
  <!-- simple bus emoji or custom drawing -->
  <text x="0" y="24" font-size="24">🚌</text>
</svg>
```

You can export a custom vector icon from any design tool or use an icon library. The browser will scale the SVG to the size you need.
You can fine‑tune the coordinates or use a data URI if you prefer not to keep the file in `public`.

---

## Landing Animation

The app now shows a branded loading screen on start:

- Bus icon and welcome text animate for two seconds, then redirect to login.
- The component is `src/Components/Landing.jsx`.
- Route `/` maps to the landing page; login moved to `/login`.

You may provide a more elaborate SVG or animation later, but the current implementation gives
an attractive MSRTC-flavoured splash before the user reaches the login form.
