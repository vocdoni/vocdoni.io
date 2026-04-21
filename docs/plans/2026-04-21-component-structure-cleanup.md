# Component structure cleanup inventory

## Goal

Converge `components/VocdoniApp/` and `components/VocdoniAppV3/` into stable domain folders without changing runtime behavior during the guardrail rollout.

## Current inventory

`components/VocdoniApp/` currently contains legacy or mixed app-landing sections such as hero, features, technology, FAQ, services, and supporting media components.

`components/VocdoniAppV3/` currently contains newer app-landing sections such as value props, target users, features, and FAQ.

## Target structure

- `components/app/` for custom app-landing sections and supporting components
- `components/home/` for custom home-page sections when studio blocks do not fit
- `components/use-cases/` for custom use-case sections when studio blocks do not fit

Shared primitives remain in `components/ui/`.

Studio-derived blocks remain in `components/shadcn-studio/`.

## Migration approach

1. Freeze new version-suffixed folders immediately via validation and docs.
2. Move one app section at a time into `components/app/` with import-only refactors.
3. Keep page composition behavior unchanged during moves.
4. Remove now-empty legacy folders only after all imports are updated.
