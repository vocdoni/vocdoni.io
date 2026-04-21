# AI agent guardrails

This repository uses a single Vike codebase. The main risk is not “multiple codebases”, but uncontrolled component sprawl and untranslated UI copy.

## Component placement

- `components/ui/` is only for reusable UI primitives.
- `components/shadcn-studio/` is only for imported or adapted shadcn-studio blocks.
- Custom sections belong in stable domain folders such as `components/app/`, `components/home/`, or `components/use-cases/`.
- Do not create new revision folders such as `*V2`, `*V3`, `new-*`, or `legacy-*`.

Current exceptions:

- `components/VocdoniApp/`
- `components/VocdoniAppV3/`

These are temporary structural debt and should be merged into stable domain folders over time. No new version-suffixed folders are allowed.

## UI decision tree

1. Reuse an existing shadcn-studio block if it already fits.
2. Adapt a studio block if the shape is close and the customization remains understandable.
3. Build a custom domain component only when studio blocks do not fit the behavior or layout.
4. If custom code is needed, name it by domain or purpose, never by migration phase or revision number.

## i18n rule

- User-facing copy in `pages/` and `components/` must go through `react-i18next`.
- Use `t('key.path', 'Default value')`.
- After adding or changing translation keys, run `pnpm translations` and keep locale files in sync.

## Validation commands

- `pnpm guardrails:components`
- `pnpm guardrails:translations`
- `pnpm guardrails:i18n-copy`
- `pnpm guardrails`
- `pnpm validate`
