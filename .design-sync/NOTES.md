# design-sync notes — @molulabs/ds

## Publish target: the artifact, not Claude Design
- The design system is published to the Claude artifact **Molulabs Design System**: https://claude.ai/artifact/KAuvBfAZztNVmtWNNH7K59 (type "Design System", `"editing": "code"`). Publish there with the Artifact tool, following the type's `artifact-type/reference/from-code.md` (re-sync: send only the changed files under `project/`, then the index last with `lastChange` set, and update `project/github.md` with the synced version and short sha).
- `projectId` in `config.json` (`9dc4b57a-…`) is the old Claude Design project. It stays only because the converter reads the config; never upload to it. Standalone Claude Design closes on 2026-12-14.
- The old artifact "Molulabs DS (synced)" (Claude Design project `11a50539-…`) was deleted on 2026-11-13.
- `/design-sync` cannot publish there yet: `get_project` on `9dc4b57a` returns `moveState: "moved"` and the run stops before building (checked 2026-11-13). Don't run it until a Claude Code release says it supports artifacts.

### How a sync works now (repo → artifact)
1. Change the code here, run `npm test` (and `npm run tokens:native` after a token change), commit and push.
2. Ask Claude Code to sync the artifact. It diffs the new commit against the one in `project/github.md` and maps each change:
   - `src/<group>/X.jsx` and `X.native.jsx` → `project/components/<group>/X.jsx` / `X.native.jsx`
   - types → `project/components/index.d.ts` and `project/components/X/X.d.ts`
   - `tokens/*.css` → `project/tokens.json` (and `project/tokens.css`)
   - previews → `project/components/X/preview.html`
   - web code changed → rebuild `project/components/bundle.js` and `bundle.css` (one IIFE assigning `window.MolulabsDS`; the converter scripts that used to live in `.ds-sync/` can be staged again from the design-sync skill, or bundle with esbuild as `from-code.md` describes). Native-only changes need no rebuild.
3. Publish only the changed files, then `project/github.md` and the index (`project/design-system.json`) last, with `lastChange` set and `"editing": "code"` kept. Confirm the file list with the user before publishing.

- No `dist/` and no build: the package ships JSX source. Sync runs with `--entry ./src/index.js`; the component list comes from `src/index.d.ts` (the root `package.json` now has `"types": "./src/index.d.ts"` — the converter reads that field, not `exports`).
- `@types/react` must be reachable from the package dir or props resolve to `any` (`[DTS_REACT]`). Staged deps live in `.ds-sync/`; the converter looks for `node_modules/@types/react` walking up from the repo, so a **temporary** symlink `node_modules -> .ds-sync/node_modules` is created for the run (gitignored). Remove it afterwards: the backoffice container mounts this dir and a stray `node_modules` could duplicate React there.
- Styling: `styles.css` is an `@import` list of `tokens/*.css`, whose `url()`s point at `../assets/fonts/`. `.design-sync/flatten-css.mjs` inlines it into `.design-sync/ds.css` (gitignored, `cssEntry`); **run it before every build** (`node .design-sync/flatten-css.mjs`). The converter then extracts the fonts into `fonts/` and tokens end up in `_ds_bundle.css`; `ds-bundle/tokens/` is empty by design.
- Build/driver command: `node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./.ds-sync/node_modules --entry ./src/index.js --out ./ds-bundle [--remote .design-sync/.cache/remote-sync.json]`.
- Components need no provider (inline styles + CSS vars). Only `ToastProvider` for `useToasts()`.
- Overlay previews (Modal, ModalHeader, Dialog) use `contained` inside a positioned frame + `cardMode: single`. RowActions opens its menu on mount via a click in `useEffect`, trigger right-aligned so the right-anchored menu isn't clipped; viewport 360x340 or the menu flips upward and clips.
- Group `general` is auto-derived for components not matching a file name (Checkbox, RadioGroup, Switch, DateRange, ModalHeader/Body/Footer, ToastStack, SatelliteIcon, AppBarAction, FormActions, ListGroup, SheetAction).

## Known render warns
- `[RENDER_THIN] SatelliteIcon`: inline SVG with no text, legitimately paints no text.

## Preview coverage
Authored + graded good (29): Button, Card, DataTable, Field, IconButton, StatTile, StatGrid, Tag, TextInput, Textarea, NumberInput, Select, Checkbox, Choice, FilterBar, Pagination, TableToolbar, KeyValueList, RowActions, Modal, ModalHeader, Dialog, Toast, AlertBanner, EmptyState, DonutChart, AppBarAction, SatelliteIcon, MapMarker.
Authored 2026-10-09, screenshots reviewed by eye, not graded by the pipeline (17): AppBar, BrandButton, FormActions, FormRow, Hero, ListGroup, ListRow, ModalBody, ModalFooter, NavItem, PageHeader, Section, SectionHeader, Sheet, SheetAction, ToastProvider, ToastStack. All 70 components now have an authored preview; none is a floor card.
- Fixed-position pieces (ToastProvider `stackStyle`, ToastStack `style`) use `position: 'static'` in previews, otherwise they escape the card. ToastProvider previews pass `duration={Infinity}` so the toasts don't auto-close before the screenshot.
- Hero/Section previews wrap in `data-density="comfortable"` (they are only meant for that density). On the chrome Hero the primary action is a `secondary` Button: the default primary is the same green as the field and disappears.
- `cardMode: "column"` is set for the previews that the pipeline flagged `GRID_OVERFLOW` (FormRow, SectionHeader, FormActions, ListGroup, AppBar, ListRow, PageHeader).

## Re-sync risks
- `tokens/native.js` (React Native) is generated from `tokens/*.css`: after any token change, including an import from Claude Design, run `npm run tokens:native`. `npm test` fails while it is stale.
- React Native versions sit next to each web component as `<Name>.native.jsx`, share its `.d.ts` and are exported only from `src/index.native.js`: `src/index.js` (the sync entry) never imports them. Their render tests are in `native-tests/` (`npm run test:native`), which has its own node_modules so the root keeps none.
- `assets/fonts/native/*.ttf` (React Native) are cut from the woff2 by `scripts/native-fonts.py` (fontTools; the docker command is in its header). Re-run it if a woff2 changes, e.g. a new Tabler version.
- Previews carry hardcoded Argentine sample data (CUITs, comprobantes) — fine unless prop shapes change; sanity-check against `.d.ts` after API edits.
- `ds.css` is generated from `styles.css`'s import list: a new token file added to `styles.css` is picked up only if `flatten-css.mjs` runs first.
- `mobile/` and `marketing/` were untracked in git at first sync (uncommitted work in the repo); they synced from the working tree.
- Anchor: first upload had no `_ds_sync.json` until close-out; `--remote` anchor from the project is expected on later syncs.
