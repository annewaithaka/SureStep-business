# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
backend/
├─ main.py
├─ config.py
├─ extensions.py
├─ requirements.txt
├─ run.py              # optional
├─ wsgi.py             # optional
│
├─ core/
│  ├─ __init__.py
│  └─ models.py        # global models (if any)
│
├─ modules/
│  ├─ auth/
│  │  ├─ __init__.py
│  │  ├─ models.py
│  │  └─ routes.py
│  │
│  ├─ dashboard/
│  │  ├─ __init__.py
│  │  └─ routes.py
│  │
│  ├─ contact/
│  │  ├─ __init__.py
│  │  ├─ models.py      # contact messages DB table
│  │  └─ routes.py
│  │
│  ├─ leads/
│  │  ├─ __init__.py
│  │  ├─ models.py      # leads table
│  │  └─ routes.py
│  │
│  ├─ services/
│  │  ├─ __init__.py
│  │  ├─ models.py      # services table
│  │  └─ routes.py
│  │
│  ├─ portfolio/
│  │  ├─ __init__.py
│  │  ├─ models.py      # portfolio items table
│  │  └─ routes.py
│  │
│  ├─ notifications/
│  │  ├─ __init__.py
│  │  └─ routes.py      # simple notifications endpoint
│  │
│  └─ scoreapp_webhook/
│     ├─ __init__.py
│     ├─ models.py       # Client + Response
│     └─ routes.py       # webhook BP
│
└─ venv/
