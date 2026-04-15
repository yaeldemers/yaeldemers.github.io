# yaeldemers.github.io

Personal portfolio — [yaeldemers.com](https://yaeldemers.com)

Built with Next.js (static export), React 19, TypeScript, and Tailwind CSS 4. Deployed on GitHub Pages.

## Stack

- **Framework** — Next.js 16 (App Router, `output: "export"`)
- **Styling** — Tailwind CSS 4 + PostCSS
- **Theming** — `next-themes` (light / dark)
- **i18n** — Custom `useLanguage` hook, EN + FR
- **Icons** — lucide-react
- **Testing** — Vitest
- **Linting** — ESLint 9 + `eslint-plugin-i18next`
- **Formatting** — Prettier (auto-applied on commit via husky + lint-staged)

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export → out/
npm run lint      # ESLint check
npm run format    # Prettier write
npm test          # Vitest
```

## License

This project is licensed under the MIT License.

Feel free to use the code for your own portfolio or projects.  
Please do not copy personal content (text, images, branding).
