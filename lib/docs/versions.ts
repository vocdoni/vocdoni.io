// Registry of documentation versions available on /developers/docs pages.
//
// A version with no `branch` is the one baked into the static build (whatever
// branch this site was built from). A version with a `branch` is fetched at
// runtime from that branch of `DOCS_GITHUB_REPO` on GitHub raw - see the
// (separately wired) fetch layer for that behaviour. This module only
// declares the registry; it does not fetch anything.

export interface DocsVersion {
  id: string
  labelKey: string
  labelDefault: string
  branch?: string
}

// GitHub repo slug the remote (branch-backed) versions are fetched from.
export const DOCS_GITHUB_REPO = 'vocdoni/vocdoni.io'

export const DOCS_VERSIONS: DocsVersion[] = [
  {
    id: 'production',
    labelKey: 'developers.docs.version.production',
    labelDefault: 'Production',
  },
  {
    id: 'stage',
    labelKey: 'developers.docs.version.stage',
    labelDefault: 'Stage',
    branch: 'stage',
  },
]

export const DOCS_VERSION_DEFAULT: DocsVersion = DOCS_VERSIONS[0]

export function getDocsVersion(id: string): DocsVersion | undefined {
  return DOCS_VERSIONS.find((version) => version.id === id)
}

export function isRemoteVersion(version: DocsVersion): boolean {
  return typeof version.branch === 'string' && version.branch.length > 0
}
