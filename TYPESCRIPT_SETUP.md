# TypeScript Setup Guide

Step-by-step guide to add TypeScript to this devcontainer + Vite/Lit frontend.

---

## Step 1 — Edit the Dockerfile

File: `.devcontainer/debian/Dockerfile.debian`

Add at the end:

```dockerfile
RUN npm install -g typescript
```

---

## Step 2 — Update `frontend/package.json`

Add a `typecheck` script and `typescript` devDependency:

```json
{
  "scripts": {
    "dev": "vite --host --port 5173 --strictPort",
    "build": "vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.8.3",
    "vite": "^8.0.12"
  }
}
```

---

## Step 3 — Create `frontend/tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "useDefineForClassFields": false,
    "lib": ["ES2021", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

Key choices:
- `useDefineForClassFields: false` — required for Lit `@property()` decorators to work
- `moduleResolution: "bundler"` — correct for Vite
- `noEmit: true` — Vite handles transpilation; `tsc` is type-check only

---

## Step 4 — Rebuild the devcontainer

In VS Code: **Cmd/Ctrl+Shift+P → "Dev Containers: Rebuild Container"**

---

## Step 5 — Install the npm package

```sh
cd /xyz/frontend && npm install
```

---

## Step 6 — Verify

```sh
# Confirm tsc is globally available
tsc --version

# Run type-checker (should pass — existing .js files are excluded)
cd /xyz/frontend && npm run typecheck
```

To confirm IDE support, create a `src/hello.ts` file and check that VS Code shows type errors and completions.

---

**Note:** Existing `.js` source files are untouched. `include: ["src"]` without `allowJs` means `tsc` only checks new `.ts` files you add going forward.
